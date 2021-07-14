import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import axios from "axios";
import { Patient, Diagnosis, Entry } from "../types";
import { Icon, Button } from "semantic-ui-react";
import HealthEntry from "../components/HealthEntry";
import OccupationalHealthcare from "../components/OccupationalHealthcare";
import AddEntryModal from "../AddEntryModal";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";
import { useStateValue } from "../state";
import Hospital from "../components/Hospital";

const SinglePatientPage = () => {
  const [singlePatient, setSinglePatient] = React.useState<Patient>();
  const [diagnoses, setDiagnoses] = React.useState<Array<Diagnosis>>();
  const [entry, setEntry] = React.useState<Array<Entry>>();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  // const [, dispatch] = useStateValue();
  const [{ entries }, dispatch] = useStateValue();

  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    void axios.get(`${apiBaseUrl}/patients/${id}`).then((response) => {
      setSinglePatient(response.data);
      setEntry(response.data.entries);
    });

    void axios
      .get(`${apiBaseUrl}/diagnoses`)
      .then((response) => setDiagnoses(response.data));
  }, [id, entries]);

  if (!singlePatient) return null;
  if (!diagnoses) return null;

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      // console.log(`values`, values);

      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );

      // console.log(`newEntry`, newEntry);
      dispatch({ type: "ADD_ENTRY", payload: newEntry });
      // console.log(`entries`, entries);

      closeModal();
    } catch (e) {
      console.error(e.response?.data || "Unknown Error");
      setError(e.response?.data?.error || "Unknown Error");
    }
  };

  return (
    <div>
      <h1>
        {singlePatient?.name ?? "unknown"}{" "}
        <Icon name={singlePatient?.gender === "male" ? "mars" : "venus"} />
      </h1>
      <div>ssn: {singlePatient?.ssn}</div>
      <div>occupation: {singlePatient?.occupation}</div>

      {entry && (
        <div>
          <h2>entries</h2>

          {entry.map((entry, i) => {
            if (entry.type === "HealthCheck") {
              return (
                <div key={i}>
                  <HealthEntry entry={entry} />
                </div>
              );
            } else if (entry.type === "OccupationalHealthcare") {
              return (
                <div key={i}>
                  <OccupationalHealthcare entry={entry} />
                </div>
              );
            } else if (entry.type === "Hospital") {
              return (
                <div key={i}>
                  <Hospital entry={entry} />
                </div>
              );
            }

            // return (
            //   <div key={i}>
            //     <p>
            //       {entry.date} {entry.description}
            //     </p>
            //     {entry.diagnosisCodes && (
            //       <ul>
            //         {entry.diagnosisCodes.map((entryDiagnose, i) => {
            //           const diagnose = diagnoses.find(
            //             (diagnose) => diagnose.code === entryDiagnose
            //           );
            //           return (
            //             <li key={i}>
            //               {entryDiagnose} {diagnose?.name}
            //             </li>
            //           );
            //         })}
            //       </ul>
            //     )}
            //   </div>
            // );
          })}
        </div>
      )}

      <div>
        <br />
        <AddEntryModal
          modalOpen={modalOpen}
          onClose={closeModal}
          onSubmit={submitNewEntry}
          error={error}
        />
        <Button onClick={() => openModal()}>Add Entry</Button>
      </div>
    </div>
  );
};

export default SinglePatientPage;
