import patients from "../../data/patients";
// import patients from "../../data/patients.json";
import { NewPatientType, NonSensitivePatientsData, PatientsTypes } from "../types";
import { v1 as uuid } from "uuid";

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

const addPatients = (patient: NewPatientType): PatientsTypes => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const newPatientEntry = {
    id: uuid(),
    // ssn: uuid(),
    ...patient
  };

  patients.push(newPatientEntry);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return newPatientEntry;
};

export default {
  getPatients,
  getNonSensitivePatients,
  addPatients,
};
