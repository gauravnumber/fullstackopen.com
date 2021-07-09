// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
  
}

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
