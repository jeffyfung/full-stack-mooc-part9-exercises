const _ = require('lodash');

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (target: number, hours: Array<number>): Result => {
  let sum = _.sum(hours);
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

// console.log(calculateExercises(2, [3, 0, 2, 4.5, 0, 3, 1]));

export { calculateExercises };
