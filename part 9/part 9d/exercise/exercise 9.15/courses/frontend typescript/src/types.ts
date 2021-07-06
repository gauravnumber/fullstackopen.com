interface CoursePart {
  name: string;
  exerciseCount: number;
  description?: string;
  requirements?: string[];
  exerciseSubmissionLink?: string;
}

export interface ContentTypes {
  courseParts: Array<CoursePart>;
}
