import React from "react";
import axios from "axios";
import { Container, Table, Button } from "semantic-ui-react";

import { PatientFormValues } from "../AddPatientModal/AddPatientForm";
import AddPatientModal from "../AddPatientModal";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import HealthRatingBar from "../components/HealthRatingBar";
import { useStateValue } from "../state";

import {
  // BrowserRouter as Router,
  Link,
  // Switch,
  // Route,
  // useRouteMatch,
  // useParams,
} from "react-router-dom";

const PatientListPage = () => {
  const [{ patients }, dispatch] = useStateValue();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();
  // const [singlePatient, setSinglePatient] = React.useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewPatient = async (values: PatientFormValues) => {
    try {
      const { data: newPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients`,
        values
      );

      console.log(`newPatient`, newPatient);
      dispatch({ type: "ADD_PATIENT", payload: newPatient });
      closeModal();
    } catch (e) {
      console.error(e.response?.data || "Unknown Error");
      setError(e.response?.data?.error || "Unknown error");
    }
  };

  // const patient = match ? await axios.get(`${apiBaseUrl}/patients/`) : null
  // console.log(`match.params.id`, match.params.id);
  // try {
  //   // function findId(params: {}): string | {} {
  //   //   return params.id;
  //   // }

  //   // const match = useRouteMatch("/patients/:id");
  //   // const patient = await axios.get(`${apiBaseUrl}/patients/${match?.params?.id}`);
  //   // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  //   // const temp = match?.params;
  //   // console.log(`id`, temp?.id);
  //   // const id = findId(match?.params);
  //   // console.log(`id`, id);
  //   // const { id } = useParams<{ id: string }>();
  //   // console.log(`id`, id);

  //   void axios
  //     // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  //     .get(`${apiBaseUrl}/patients/d2773598-f723-11e9-8f0b-362b9e155667`)
  //     // .get(`${apiBaseUrl}/patients/${id}`)
  //     // .get(`${apiBaseUrl}/patients/${match?.params?.id}`)
  //     .then((response) => {
  //       // console.log(`response`, response);
  //       console.log(`response.data`, response.data);
  //       // setSinglePatient(response.data);
  //     });
  //   // void axios
  //   //   // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  //   //   .get(`${apiBaseUrl}/patients/d2773598-f723-11e9-8f0b-362b9e155667`)
  //   //   // .get(`${apiBaseUrl}/patients/${match?.params?.id}`)
  //   //   .then((response) => console.log(`response.data`, response.data));
  //   // console.log(`patient`, patient);
  //   // const param = useParams<{ id: string }>("/patienst/:id");
  //   // console.log(`param`, param);
  // } catch (error) {
  //   console.info(error);
  // }

  return (
    // <Router>
    //   <Switch>
    //     <Route path="/patients/:id">
    //       <h2>id </h2>
    //     </Route>

    //     <Route path="/">
    <div className="App">
      <Container textAlign="center">
        <h3>Patient list</h3>
      </Container>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Gender</Table.HeaderCell>
            <Table.HeaderCell>Occupation</Table.HeaderCell>
            <Table.HeaderCell>Health Rating</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {Object.values(patients).map((patient: Patient) => (
            <Table.Row key={patient.id}>
              <Table.Cell>
                <Link to={`/patients/${patient.id}`}>{patient.name}</Link>
              </Table.Cell>
              <Table.Cell>{patient.gender}</Table.Cell>
              <Table.Cell>{patient.occupation}</Table.Cell>
              <Table.Cell>
                <HealthRatingBar showText={false} rating={1} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <AddPatientModal
        modalOpen={modalOpen}
        onSubmit={submitNewPatient}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Patient</Button>
    </div>
    //     </Route>
    //   </Switch>
    // </Router>
  );
};

export default PatientListPage;
