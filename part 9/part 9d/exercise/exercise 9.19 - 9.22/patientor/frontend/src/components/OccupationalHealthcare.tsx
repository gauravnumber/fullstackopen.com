import React from "react";
import { 
  // Entry, 
  OccupationalHealthcareEntry 
} from "../types";
import { Message, Icon } from "semantic-ui-react";

const OccupationalHealthcare = ({ entry }: { entry: OccupationalHealthcareEntry }) => {
  // console.log(`entry`, entry);
  // console.log(`entry.employerName`, entry.employerName);

  return (
    <div>
      <Message>
        <Message.Content>
          <Message.Header>
            {entry.date}
            <Icon name="stethoscope" size="large" />
            {entry.employerName}
          </Message.Header>
          {entry.description}
        </Message.Content>
      </Message>
      {/* <p>
        {entry.date} {entry.description}
      </p> */}
    </div>
  );
};

export default OccupationalHealthcare;
