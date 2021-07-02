import express from "express";
import diagnosesService from "../service/diagnosesService";

const router = express.Router();

// console.log("routes/diagnoses");

router.get("/", (_req, res) => {
  // res.send("dianoses");
  res.send(diagnosesService.getDiagnoses());
});

export default router;
