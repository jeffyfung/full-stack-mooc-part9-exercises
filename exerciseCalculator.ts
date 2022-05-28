interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (args: Array<any>): Result => {
  let [target, hours] = args;
  let sum = 0;
  for (let hour of hours) sum += hour;
  let coverage: number = sum / target;
  let rating: number, ratingDescription: string;
  if (coverage > 1) {
    rating = 3;
    ratingDescription = 'Above target';
  } else if (coverage > 0.75) {
    rating = 2;
    ratingDescription = 'Just missed the target';
  } else {
    rating = 1;
    ratingDescription = 'Below target';
  }
  return {
    periodLength: hours.length,
    trainingDays: hours.filter((h: number) => h > 0).length,
    success: sum >= target,
    rating,
    ratingDescription,
    target,
    average: sum / hours.length,
  };
};

const parseArgument = (args: Array<string>): Array<any> => {
  if (args.length < 4) throw new Error('too few arguments');

  const target: number = Number(args[2]);
  if (isNaN(Number(target))) {
    throw new Error('target should be number');
  }

  const hours: Array<number> = args.slice(3).map((h: string) => {
    if (isNaN(Number(h))) {
      throw new Error('hour should be number');
    }
    return Number(h);
  });

  return [target, hours];
};

try {
  let args = parseArgument(process.argv);
  console.log(calculateExercises(args));
} catch (error: unknown) {
  let errorMessage = 'something bad happened';
  if (error instanceof Error) {
    errorMessage += ` Error: ${error.message}`;
  }
  console.log(errorMessage);
}

// console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));

export {};
