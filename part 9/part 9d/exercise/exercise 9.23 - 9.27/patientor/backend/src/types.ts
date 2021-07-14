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

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export interface SickLeaveType {
  startDate: string;
  endDate: string;
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: SickLeaveType;
  // sickLeave?: {
  //   startDate: string;
  //   endDate: string;
  // };
}

export interface DischargeType {
  date: string;
  criteria: string;
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge?: DischargeType;
  // discharge?: {
  //   date?: string;
  //   criteria?: string;
  // };
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

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
export type NewEntryType = Omit<Entry, "id">;
export type NewHealthCheckEntry = Omit<HealthCheckEntry, "id">;
export type NewHospitalEntry = Omit<HospitalEntry, "id">;
export type NewOccupationalHealthcareEntry = Omit<
  OccupationalHealthcareEntry,
  "id"
>;
// export type NewEntryType = Omit<HealthCheckEntry, "id">;
