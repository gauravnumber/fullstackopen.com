interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: string[];
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge?: {
    date?: string;
    criteria?: string;
  };
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
// export interface Entry {

// }

// export interface Patient {
//   id: string;
//   name: string;
//   dateOfBirth: string;
//   ssn?: string;
//   gender: string;
//   occupation: string;
//   entries?: Entry[];
// }

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface DiagnosesTypes {
  code: string;
  name: string;
  latin?: string;
}

export interface PatientsTypes {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn?: string;
  gender: string;
  occupation: string;
  entries?: Entry[];
}

export type PublicPatient = Omit<PatientsTypes, "ssn" | "entries">;

export type NonSensitivePatientsData = Omit<PatientsTypes, "ssn">;
export type NewPatientType = Omit<PatientsTypes, "id">;
