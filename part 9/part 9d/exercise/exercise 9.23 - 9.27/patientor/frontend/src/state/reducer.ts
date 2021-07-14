import { State } from "./state";
import { Patient, Entry } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "ADD_ENTRY";
      payload: Entry;
    };

export const reducer = (state: State, action: Action): State => {
  console.log(`state`, state);
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };

    case "ADD_ENTRY":
      // console.log(`state`, state);
      return {
        ...state,
        entries: {
          ...state.entries,
          [action.payload.id]: action.payload,
        },
      };
    default:
      return state;
  }
};

export const setPatientList = (
  patientListFromApi: Patient[]
): {
  type: "SET_PATIENT_LIST";
  payload: Patient[];
} => {
  return { type: "SET_PATIENT_LIST", payload: patientListFromApi };
};
