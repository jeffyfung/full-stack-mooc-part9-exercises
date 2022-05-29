import express from 'express';
import { calculateBMI } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.listen(process.env.PORT || 3003, () => {
  console.log(`Server running on port ${process.env.PORT || 3003}`);
});

app.use(express.json());

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

app.post('/exercises', (req, res) => {
  try {
    let { daily_exercises: dailyExercises, target } = req.body;

    if (!dailyExercises || !target) {
      throw new Error('parameters missing');
    }

    dailyExercises = dailyExercises.map((ex: string) => {
      if (isNaN(Number(ex))) {
        throw new Error('malformatted parameters');
      }
      return Number(ex);
    });

    target = Number(req.body.target);
    if (isNaN(Number(target))) {
      throw new Error('malformatted parameters');
    }

    const rtn = calculateExercises(target, dailyExercises);
    res.status(200).json(rtn);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    }
    res.status(400).end();
  }
});
