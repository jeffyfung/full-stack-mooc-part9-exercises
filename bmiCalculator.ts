const calculateBMI = (height: number, weight: number): string => {
  // check if height or weight is NaN
  if (isNaN(height) || isNaN(weight)) {
    throw new Error('weight and height should be numbers');
  }
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

let out: string = calculateBMI(180, 74);
console.log(out);
