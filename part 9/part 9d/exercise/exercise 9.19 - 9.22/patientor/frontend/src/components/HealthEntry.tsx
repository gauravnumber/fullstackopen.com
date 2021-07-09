/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from "react";
import { HealthCheckEntry } from "../types";
import {
  Message,
  Icon,
  // Rating
} from "semantic-ui-react";

const HealthEntry = ({ entry }: { entry: HealthCheckEntry }) => {
  // console.log(`entry`, entry);
  // console.log(`entry`, entry.healthCheckRating);
  // console.log(`Entry`, Entry);
    // console.log(`entry.healthCheckRating`, entry.healthCheckRating.Healthy);

const ratingToColor = (rating: number) => {
  switch (rating) {
    case 0: return "green";
    case 1: return "yellow"; 
    case 2: return "orange";
    case 3: return "red";
  }
};

  return (
    <div>
      <Message>
        {/* <Icon name="circle notched" loading /> */}
        <Message.Content>
          <Message.Header>
            {entry.date}
            <Icon name="doctor" size="large" />
          </Message.Header>
          {entry.description}
        </Message.Content>
        {/* <Icon name="heart" color={ratingToColor(1)}/> */}
        <Icon name="heart" color={ratingToColor(entry.healthCheckRating)}/>
        {/* <Icon name="heart" color="yellow"/> */}
        {/* <Rating icon="heart" rating={2} /> */}
      </Message>
      {/* <p>
        {entry.date} {entry.description}
      </p> */}
    </div>
  );
};

export default HealthEntry;
