import patientsService from "../service/patientsService";
// import { v1 as uuid } from "uuid";
// import "../utils";
// import '../../data/patients';

import express from "express";
import toNewPatientEntry from "../utils";
const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientsService.getNonSensitivePatients());
});

router.post("/", (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);

    const addedEntry = patientsService.addPatients(newPatientEntry);
    res.json(addedEntry);
  } catch (e) {
    res.status(400).send(e.message);
  }

  // const body = req.body;
  // // body.id = Math.floor(Math.random() * 10);
  // body.id = uuid();
  // body.ssn = Math.floor(Math.random() * 40) + 10;

  // patientsService.addPatients(body);

  // res.status(200).json(req.body);
});

export default router;
