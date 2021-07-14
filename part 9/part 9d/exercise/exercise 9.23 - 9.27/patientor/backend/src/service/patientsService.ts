import patients from "../../data/patients";
import {
  Entry,
  NewPatientType,
  NonSensitivePatientsData,
  PatientsTypes,
  // PublicPatient,
} from "../types";
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

// const getSingleNonSensitivePatient = (id: string): PublicPatient => {
const getSingleNonSensitivePatient = (id: string) => {
  const patient = patients.find((patient) => patient.id === id);
  // console.log(`patient`, patient);
  return patient;
};

const addPatients = (patient: NewPatientType): PatientsTypes => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const newPatientEntry = {
    id: uuid(),
    // ssn: uuid(),
    ...patient,
  };

  patients.push(newPatientEntry);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return newPatientEntry;
};

// const addEntry = ({entry, id}) => {
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const addEntry = (entry: any, id: string): Entry => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const newEntry: Entry = {
    id: uuid(),
    ...entry,
  };

  // console.log(`entry`, entry);
  const patient = patients.find((patient) => patient.id === id);
  const patientIndex = patients.findIndex((patient) => patient.id === id);

  if (patient !== undefined) {
    // return null;
    patient.entries?.push(newEntry);
    patients.push(patient);
    patients.splice(patientIndex, 1, patient);
    // console.log(`patient`, patient);
    // patients = patients
    //   .filter((patient) => patient.id === id)
    //   .map((patient) => patient.entries?.push(newEntry));
    // patients.shift();
    // patients = 2;
    // console.log(patients[0]["id"]);
    // patients?[0].entries.push(patient);

    // const temp = patients
    //   .filter((patient) => patient.id === id)
    //   .map((patient) => patient.entries?.push(newEntry));
    // console.log(`temp`, temp);
    // console.log(`patients`, patients);
    // (patient || "")?.entries.push(newEntry);
  }

  // console.log(`id`, id);
  // patient.entries = patient.entries.concat(newEntry);
  // console.log(`patient`, patient);

  return newEntry;
};
export default {
  getPatients,
  getNonSensitivePatients,
  addPatients,
  getSingleNonSensitivePatient,
  addEntry,
};
