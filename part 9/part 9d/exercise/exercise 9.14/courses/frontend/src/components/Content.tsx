import React from "react";
import { ContentTypes } from "../types";

const Content = (props: ContentTypes) => {
  if (!props.courseParts) return null

  return (
    <div>
      {props.courseParts.map((coursePart, i) => (
        <p key={i}>
          {coursePart.name} {coursePart.exerciseCount}
        </p>
      ))}
    </div>
  );
};

export default Content;
