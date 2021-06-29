import express from "express";
// import bmi = require('./bmiCalculator')
// import bmi = module('bmiCalculator')
// import { calculateBmi } from './bmiCalculator'
// import { example } from './bmiCalculator'
// import * as Emp from "./bmiCalculator"
import * as bmi from "./bmiCalculator";
// console.log(bmi.age);
// console.log(Emp.age);
const app = express();

app.get("/hello", (req, res) => {
  console.log(req.query);
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const weight: number = Number(req.query.weight);
  const height: number = Number(req.query.height);
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

app.use((_req, res) => {
  res.json({
    error: "malformatted parameters"
  });
});

app.listen(3002, () => {
  console.log("App listening in 3002");
});
