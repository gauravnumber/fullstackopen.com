import {
  DischargeType,
  // Entry,
  Gender,
  // HealthCheckEntry,
  // NewEntryType,
  // NewHealthCheckEntry,
  // NewEntryType,
  NewPatientType,
  SickLeaveType,
} from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error("Incorrect or missing name");
  }

  return name;
};

// const parseType = (
//   type: "HealthCheck" | "OccupationalHealthcare" | "Hospital"
// ): "HealthCheck" | "OccupationalHealthcare" | "Hospital" => {
//   // if (!type || !isString(type)) {
//   if (!type) {
//     throw new Error("Incorrect or missing type");
//   }
//   return type;
// };
const isNumber = (num: number): boolean => {
  return !isNaN(num);
};

// console.log(`isNumber`, isNumber(34));

// const parseNumber = (number: number): number => {
//   if (!number || !isNumber(number)) {
//     throw new Error("Incorrect or missing number");
//   }

//   return number;
// };

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error("Incorrect or missing occupation");
  }

  return occupation;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }
  return gender;
};

// const parseHealthCheck = (param: NewHealthCheckEntry): NewHealthCheckEntry => {
//   return param;
// };

const parseHealthCheckRating = (param: number): number => {
  // if (!param || !isNumber(param) || param !== 0 ) {
  if (param > 3 || param < 0) {
    throw new Error(
      `Health Check Rating is out of range (${param}) please choose 0 - 3`
    );
  }

  if (param === 0) return param;

  if (!param || !isNumber(param)) {
    throw new Error("Incorrect or missing healthCheckRating: " + param);
  }

  return param;
};

// const parseDischarge = (param: { date: string; criteria: string }) => {
const parseDischarge = (param: DischargeType): DischargeType => {
  if (!param.date || !isString(param.date) || !isDate(param.date)) {
    throw new Error("Incorrect or missing discarge date: " + param.date);
  }

  if (!param.criteria || !isString(param.criteria)) {
    throw new Error(
      "Incorrect or missing discarge criteria: " + param.criteria
    );
  }

  return param;
};

const parseSickLeave = (param: SickLeaveType): SickLeaveType => {
  if (
    !param.startDate ||
    !isString(param.startDate) ||
    !isDate(param.startDate)
  ) {
    throw new Error(
      "Incorrect or missing discarge startDate: " + param.startDate
    );
  }

  if (!param.endDate || !isString(param.endDate) || !isDate(param.endDate)) {
    throw new Error("Incorrect or missing discarge endDate: " + param.endDate);
  }

  return param;
};

type Fields = {
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
};

const toNewPatientEntry = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
}: Fields): NewPatientType => {
  const newEntry: NewPatientType = {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseName(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
  };

  return newEntry;
};

// type Entries = {
//   // type: unknown;
//   type: "HealthCheck" | "OccupationalHealthcare" | "Hospital" ;
//   date: unknown;
//   specialist: unknown;
//   description: unknown;
//   healthCheckRating: unknown;
// };

// export const toNewEntries = ({
//   type,
//   date,
//   specialist,
//   description,
//   // healthCheckRating,
// }: Entries): NewEntryType => {
// export const toNewEntries = (props: NewHealthCheckEntry) => {
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewEntries = (props: any): any => {
  // console.log(`props`, props);
  // console.log(`props.type`, props.type);

  switch (props.type) {
    case "HealthCheck":
      return {
        type: "HealthCheck",
        date: parseDate(props.date),
        specialist: parseName(props.specialist),
        description: parseName(props.description),
        healthCheckRating: parseHealthCheckRating(props.healthCheckRating),
      };
    case "Hospital":
      return {
        type: "Hospital",
        date: parseDate(props.date),
        specialist: parseName(props.specialist),
        description: parseName(props.description),
        discharge: parseDischarge(props.discharge),
      };
    case "OccupationalHealthcare":
      return {
        type: "OccupationalHealthcare",
        date: parseDate(props.date),
        specialist: parseName(props.specialist),
        description: parseName(props.description),
        sickLeave: parseSickLeave(props.sickLeave),
      };
    default:
      throw new Error("Incorrect or missing type: " + props.type);
    // console.log(`props.type`, props.type);
    // if (!props.type || !isString(props.type)) {
    // if (!props.type || !isString(props.type)) {
    // }
  }

  // console.log(`type, healthCheckRating`, type, healthCheckRating);
  // const tempType: string = type;

  // const newEntry: NewEntryType = {
  //   // type: parseType(type),
  //   // type : "HealthCheck",
  //   type: type,
  //   date: parseDate(date),
  //   specialist: parseName(specialist),
  //   description: parseName(description),
  //   // healthCheckRating: 2,
  //   // healthCheckRating: parseNumber(healthCheckRating),
  // };

  // return newEntry;
};

export default toNewPatientEntry;
