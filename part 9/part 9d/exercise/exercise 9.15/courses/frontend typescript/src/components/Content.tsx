import React from "react";
import { ContentTypes } from "../types";

const Content = (props: ContentTypes) => {
  if (!props.courseParts) return null;

  return (
    <div>
      {props.courseParts.map((coursePart, i) => {
        return (
          <div key={i}>
            <b>
              {coursePart.name} {coursePart.exerciseCount}
            </b>
            <div>{coursePart.description}</div>
            {coursePart.requirements && <div>required skills: {coursePart.requirements?.join(',')}</div>}

            {coursePart.exerciseSubmissionLink && 
              <div>
                submit to {coursePart.exerciseSubmissionLink}
              </div>
            }
            <br />
          </div>
        );
      })}
    </div>
  );
};

export default Content;
