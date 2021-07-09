import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import axios from "axios";
import { Patient, Diagnosis, Entry } from "../types";
import { Icon } from "semantic-ui-react";
import HealthEntry from "../components/HealthEntry";
import OccupationalHealthcare from "../components/OccupationalHealthcare";

const SinglePatientPage = () => {
  const [singlePatient, setSinglePatient] = React.useState<Patient>();
  const [diagnoses, setDiagnoses] = React.useState<Array<Diagnosis>>();
  // const [entry, setEntry] = React.useState<Entry>();
  const [entry, setEntry] = React.useState<Array<Entry>>();

  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    void axios.get(`${apiBaseUrl}/patients/${id}`).then((response) => {
      setSinglePatient(response.data);
      setEntry(response.data.entries);
      // setEntry(response.data.entries[0]);
    });

    void axios
      .get(`${apiBaseUrl}/diagnoses`)
      .then((response) => setDiagnoses(response.data));
    // .then((response) => console.log(`response.data`, response.data));
  }, [id]);

  if (!singlePatient) return null;
  if (!diagnoses) return null;

  /**
   * Helper function for exhaustive type checking
  //  */
  // const assertNever = (value: never): never => {
  //   throw new Error(
  //     `Unhandled discriminated union member: ${JSON.stringify(value)}`
  //   );
  // };

  // const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  //   switch (entry.type) {
  //     case "Hospital":
  //       return <h1>Hospital</h1>;
  //     default:
  //       return assertNever(entry);
  //   }
  // };

  return (
    <div>
      <h1>
        {singlePatient?.name ?? "unknown"}{" "}
        <Icon name={singlePatient?.gender === "male" ? "mars" : "venus"} />
      </h1>
      <div>ssn: {singlePatient?.ssn}</div>
      <div>occupation: {singlePatient?.occupation}</div>
{/* {EntryDetails(singlePatient.entries[0])} */}
      {entry && (
        <div>
          <h2>entries</h2>

          {entry.map((entry, i) => {
            // console.log(`entry.type`, entry.type);

            if (entry.type === "HealthCheck") {
              return (
                <div key={i}>
                  <HealthEntry entry={entry}/>  
                </div>
              );
            } else if (entry.type === "OccupationalHealthcare") {
              return (
                <div key={i}>
                  <OccupationalHealthcare entry={entry}/>
                </div>
              );
            }
            
            return (
              <div key={i}>
                <p>
                  {entry.date} {entry.description}
                </p>
                {entry.diagnosisCodes && (
                  <ul>
                    {entry.diagnosisCodes.map((entryDiagnose, i) => {
                      const diagnose = diagnoses.find(
                        (diagnose) => diagnose.code === entryDiagnose
                      );
                      return (
                        <li key={i}>
                          {entryDiagnose} {diagnose?.name}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SinglePatientPage;
