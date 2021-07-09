import diagnoses from "../../data/diagnoses.json";
import { DiagnosesTypes } from "../types";

const getDiagnoses = (): DiagnosesTypes[] => {
  return diagnoses;
};

export default {
  getDiagnoses,
};
