const calculateBMI = (...args: number[]): string => {
  let [height, weight] = args;
  let score = weight / (height / 100) ** 2;
  if (score < 18.5) {
    return 'underweight';
  }
  if (score < 25) {
    return 'normal (healthy weight)';
  }
  if (score < 30) {
    return 'overweight';
  }
  return 'obese';
};

const parseArgument = (args: Array<string>): Array<any> => {
  if (args.length != 4) throw new Error('incorrect number of arguments');

  const height: number = Number(args[2]);
  const weight: number = Number(args[3]);

  // check if height or weight is NaN
  if (isNaN(height) || isNaN(weight)) {
    throw new Error('weight and height should be numbers');
  }
  return [height, weight];
};

try {
  let args = parseArgument(process.argv);
  console.log(calculateBMI(...args));
} catch (error: unknown) {
  let errorMessage = 'something bad happened';
  if (error instanceof Error) {
    errorMessage += ` Error: ${error.message}`;
  }
  console.log(errorMessage);
}

export {};
