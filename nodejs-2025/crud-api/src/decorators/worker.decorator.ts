import { PORT, WORKERS_ENABLED } from '../constants';

type Message = {
  port: number;
  target: string;
  method: string;
  args: any[];
};

const dontEmitSymbol = Symbol('dontEmit');

export const SubscribeToWorkers = () => {
  return function <T extends new (...args: any[]) => any>(Constructor: T): T {
    return class extends Constructor {
      constructor(...args: any[]) {
        super(...args);

        if (WORKERS_ENABLED) {
          process.on('message', (message: Message) => {
            try {
              const isExternalMessage =
                message?.target === String(Constructor.name) &&
                message?.port !== PORT;

              if (isExternalMessage) {
                const method = this[message.method] as (
                  ...args: unknown[]
                ) => unknown;

                method.apply(this, [...message.args, dontEmitSymbol]);
              }
            } catch (e) {}
          });
        }
      }
    };
  };
};

export const EmitToWorkers = (): MethodDecorator => {
  return function (
    target: object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ) {
    const stock = descriptor.value;

    if (WORKERS_ENABLED) {
      descriptor.value = function (...args: any[]) {
        let result: any;
        let message: Message | undefined;

        try {
          const lastArgument = args.pop();

          if (lastArgument !== dontEmitSymbol) {
            if (lastArgument !== null) {
              args.push(lastArgument);
            }

            message = {
              target: String(target.constructor.name),
              method: String(propertyKey),
              args,
              port: PORT,
            };
          }

          result = stock.apply(this, args);
        } catch (e) {
          throw e;
        }

        if (message) {
          process?.send?.(message);
        }

        return result;
      };
    }
  };
};
