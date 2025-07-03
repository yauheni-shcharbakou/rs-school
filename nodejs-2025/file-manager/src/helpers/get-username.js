import { parseArgs } from 'util';

export const getUsername = () => {
  try {
    const [, , ...args] = process.argv;

    const { values } = parseArgs({
      args,
      strict: true,
      options: {
        username: {
          type: 'string',
          multiple: false,
        },
      },
    });

    if (!values.username) {
      throw new Error();
    }

    return values.username;
  } catch (e) {
    throw new Error('Invalid input');
  }
};
