import patientsService from "../service/patientsService";
import express from "express";
const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientsService.getNonSensitivePatients());
});

export default router;
