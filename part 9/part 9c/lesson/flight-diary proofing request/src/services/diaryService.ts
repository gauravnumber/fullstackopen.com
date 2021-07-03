import diaries from "../../data/diaries";
import {
  NonSensitiveDiaryEntry,
  DiaryEntry,
  // Visibility,
  // Weather,
  NewDiaryEntry,
} from "../types";

const addDiary = (entry: NewDiaryEntry): DiaryEntry => {
  const newDiaryEntry = {
    id: Math.max(...diaries.map((d) => d.id)) + 1,
    ...entry,
  };

  // const newDiaryEntry = {
  //   id: Math.max(...diaries.map((d) => d.id)) + 1,
  //   date,
  //   weather,
  //   visibility,
  //   comment,
  // };

  diaries.push(newDiaryEntry);
  return newDiaryEntry;
};

const getEntries = (): Array<DiaryEntry> => {
  return diaries;
};

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  return diaries.map(({ id, date, weather, visibility }) => ({
    id,
    date,
    weather,
    visibility,
  }));
};

const addEntry = () => {
  return null;
};

const findById = (id: number): DiaryEntry | undefined => {
  const entry = diaries.find((d) => d.id === id);
  return entry;
};

export default {
  addDiary,
  getEntries,
  addEntry,
  getNonSensitiveEntries,
  findById,
};
