interface CoursePart {
  name: string;
  exerciseCount: number;
}

export interface ContentTypes {
  courseParts: Array<CoursePart>;
}
