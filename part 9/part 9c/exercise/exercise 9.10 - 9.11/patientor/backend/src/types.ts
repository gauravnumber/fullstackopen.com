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
}

export type NonSensitivePatientsData = Omit<PatientsTypes, "ssn">;
