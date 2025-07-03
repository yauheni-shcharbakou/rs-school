const parseEnv = () => {
  const env = process.env;

  console.log(
    Object.keys(env).reduce((acc, field) => {
      if (/^RSS_/g.test(field)) {
        const prefix = acc.length ? '; ' : '';
        return acc + `${prefix}${field}=${env[field]}`;
      }

      return acc;
    }, ''),
  );
};

parseEnv();
