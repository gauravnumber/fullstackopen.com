import patientsService from "../service/patientsService";

import express from "express";
import toNewPatientEntry, {
  toNewEntries, // , { toNewEntries }
} from "../utils";
const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientsService.getNonSensitivePatients());
});

router.get("/:id", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  res.send(patientsService.getSingleNonSensitivePatient(req.params.id));
});

router.post("/", (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);

    const addedEntry = patientsService.addPatients(newPatientEntry);
    res.json(addedEntry);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.post("/:id/entries", (req, res) => {
  const id = req.params.id;
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const newEntry = toNewEntries(req.body);

    const addedEntry = patientsService.addEntry(newEntry, id);
    // console.log(`body`, body);
    res.json(addedEntry);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

export default router;
