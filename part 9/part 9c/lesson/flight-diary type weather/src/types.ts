// export enum Weather {
//   Sunny = "sunny",
//   Rainy = "rainy",
//   Cloudy = "cloudy",
//   Stormy = "stormy",
//   Windy = "windy",
// }

// export enum Visibility {
//   Great = "great",
//   Good = "good",
//   Ok = "ok",
//   Poor = "poor",
// }

export type Weather = "sunny" | "rainy" | "cloudy" | "windy" | "stormy";

export type Visibility = "great" | "good" | "ok" | "poor";

export type NonSensitiveDiaryEntry = Omit<DiaryEntry, "comment">;

export type NewDiaryEntry = Omit<DiaryEntry, "id">;

export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment: string;
}
