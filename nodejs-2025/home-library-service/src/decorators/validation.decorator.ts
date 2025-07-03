import {
  isUUID,
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export function IsUUIDOrNull(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isUUIDOrNull',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return value === null || (typeof value === 'string' && isUUID(value));
        },
        defaultMessage({ property }: ValidationArguments) {
          return `${property} must be a UUID or null`;
        },
      },
    });
  };
}
