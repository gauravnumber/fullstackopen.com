import patients from "../../data/patients.json";
import { NonSensitivePatientsData, PatientsTypes } from "../types";

const getPatients = (): PatientsTypes[] => {
  return patients;
};

const getNonSensitivePatients = (): NonSensitivePatientsData[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => {
    return {
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
    };
  });
};

export default {
  getPatients,
  getNonSensitivePatients,
};
