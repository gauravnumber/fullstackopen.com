import React from "react";
import { 
  // Entry, 
  HospitalEntry
} from "../types";
import { Message,
   Icon
   } from "semantic-ui-react";

const Hospital = ({ entry }: { entry: HospitalEntry }) => {
  // console.log(`entry`, entry);
  // console.log(`entry.employerName`, entry.employerName);


  return (
    <div>
      <Message>
        <Message.Content>
          <Message.Header>
            {entry.date}
            <Icon name="hospital" size="large" />
            {/* {entry.employerName} */}

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

export default Hospital;
