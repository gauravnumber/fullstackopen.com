import diagnoses from "../../data/diagnoses.json";
import { DiagnosesTypes } from "../types";



// console.log("diagnosesService");

const getDiagnoses = (): DiagnosesTypes[] => {
  console.log(`diagnoses`, diagnoses);
  return diagnoses;
};

export default {
  getDiagnoses,
};
