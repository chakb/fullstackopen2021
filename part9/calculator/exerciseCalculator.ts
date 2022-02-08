export type rating = 1 | 2 | 3;

export interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: rating,
  ratingDescription: string,
  target: number,
  average: number
}

const calculateExcersises = (exerciseHours: Array<number>, targetAmount: number): Result => {

  const average = exerciseHours.reduce((prev, curr) => curr + prev) / exerciseHours.length;

  let rating: rating = 1;
  let ratingDescription = 'low effort';
  if (average >= targetAmount - 1) {
    rating = 2;
    ratingDescription = 'not too bad, could be etter';
  } else if (average >= targetAmount) {
    rating = 3;
    ratingDescription = 'very well done';
  }

  return {
    periodLength: exerciseHours.length,
    trainingDays: exerciseHours.reduce((days, hours) => hours ? days + 1 : days, 0),
    success: average >= targetAmount,
    rating: rating,
    ratingDescription,
    target: targetAmount,
    average
  };
};

interface ExerciseValues {
  exerciseHours: Array<number>,
  targetAmount: number
}

const parseArguments = (args: Array<string>): ExerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const exerciseHours: Array<number> = [];
  for (const arg of args.slice(2, -1)) {
    if (!isNaN(Number(arg))) {
      exerciseHours.push(Number(arg));
    } else {
      throw new Error(`${arg}: Provided values were not numbers!`);
    }
  }

  let targetAmount: number;
  if (!isNaN(Number(args[args.length - 1]))) {
    targetAmount = (Number(args[args.length - 1]));
  } else {
    throw new Error(`${args[args.length - 1]}: Provided values were not numbers!`);
  }

  return { exerciseHours, targetAmount };
};

try {
  const { exerciseHours, targetAmount } = parseArguments(process.argv);
  console.log(calculateExcersises(exerciseHours, targetAmount));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}

export default calculateExcersises;