import express from "express";
import { calculateExercises } from "./exerciseCalculator";
// import bmi = require('./bmiCalculator')
// import bmi = module('bmiCalculator')
// import { calculateBmi } from './bmiCalculator'
// import { example } from './bmiCalculator'
// import * as Emp from "./bmiCalculator"
import * as bmi from "./bmiCalculator";
// console.log(bmi.age);
// console.log(Emp.age);
const app = express();
app.use(express.json());

app.get("/hello", (req, res) => {
  console.log(req.query);
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const weight = Number(req.query.weight);
  const height = Number(req.query.height);
  const bmiMessage: string = bmi.calculateBmi(height, weight);
  // console.log(`req.query`, req.query)
  // console.log(bmi.calculateBmi(123, 34));
  // console.log(calculateBmi(123, 34));

  res.json({
    weight,
    height,
    bmi: bmiMessage,
  });

  // res.json({
  //   weight: req.query.weight,
  //   height: req.query.height,
  // })

  // res.json(req.query)
});

app.post("/webExercise", (req, res) => {
  // console.log(`req.body`, req.body);
  // calculateExercises([1, 2])
  // const obj = calculateExercises([3, 0, 2, 4.5, 0, 3, 1]);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const obj = calculateExercises(req.body.daily_exercises);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const target = req.body.target;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    res.status(200).json({ ...obj, target });
  } catch (error) {
    // console.log(error);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    // console.log(error.message);
    res.status(400).json({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      // error: error.message,
      error: "malformatted parameters",
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment

  // res.status(200).json(calculateExercises([1, 2]));
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // res.status(200).json({ target: req.body.target, ...obj });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  // res.status(200).json({  ...obj, target });
});

app.use((_req, res) => {
  res.json({
    error: "malformatted parameters",
  });
});

app.listen(3002, () => {
  console.log("App listening in 3002");
});
