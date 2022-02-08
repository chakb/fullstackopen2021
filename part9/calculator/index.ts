import express from 'express';
const app = express();
app.use(express.json());

import calculateBmi from './bmiCalculator';
import calculateExercise from './exerciseCalculator';

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = req.query.height;
  const weight = req.query.weight;

  if (isNaN(Number(height)) || isNaN(Number(weight))) {
    res.status(400).json({ error: 'malformatted parameters' }).end();
  }

  res.status(200).json({
    height,
    weight,
    bmi: calculateBmi(Number(height), Number(weight))
  });
});

app.post('/exercises', (req, res) => {
  const { daily_exercises, target } = req.body as { daily_exercises: Array<number>, target: number };

  if (!daily_exercises || !target) {
    res.status(400).json({ error: 'parameters missing' }).end();
  }
  if (!Array.isArray(daily_exercises)
    || !daily_exercises.every(day => typeof day === 'number')
    || !(typeof target === 'number')) {
    res.status(400).json({ error: 'malformatted parameters' }).end();
  }

  res.status(200).json(calculateExercise(daily_exercises, target));

});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});