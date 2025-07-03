const parseArgs = () => {
  const [, , ...args] = process.argv;
  const valueByProperty = new Map();

  for (let i = 0; i < args.length; i += 2) {
    const propertyName = args[i];
    const propertyValue = args[i + 1];

    if (/^(--\w+|\w+)/gi.test(propertyName)) {
      valueByProperty.set(propertyName.replace(/^--/g, ''), propertyValue);
    }
  }

  console.log(
    Array.from(
      valueByProperty.entries(),
      ([propName, propValue]) => `${propName} is ${propValue}`,
    ).join(', '),
  );
};

parseArgs();
