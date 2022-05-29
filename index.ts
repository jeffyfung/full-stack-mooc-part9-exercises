import express from 'express';
import { calculateBMI } from './bmiCalculator';

const app = express();

app.listen(process.env.PORT || 3003, () => {
  console.log(`Server running on port ${process.env.PORT || 3003}`);
});

app.get('/hello', (_req, res) => {
  res.send('hello full stack');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  try {
    if (isNaN(height) || isNaN(weight)) {
      throw new Error('height and weight should be numbers');
    }
    const rtn = {
      weight,
      height,
      bmi: calculateBMI(height, weight),
    };
    res.status(200).json(rtn);
  } catch (err: unknown) {
    res.status(400).json({ error: 'malformed parameters' });
  }
});
