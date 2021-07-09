import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import axios from "axios";
import { Patient } from "../types";
import { Icon } from "semantic-ui-react";

const SinglePatientPage = () => {
  // const { id } = useParams<{ id: string }>();
  // console.log(`id`, id);
  const [singlePatient, setSinglePatient] = React.useState<Patient>();

  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    console.log(`id`, id);
    void axios
      .get(`${apiBaseUrl}/patients/${id}`)
      .then((response) => setSinglePatient(response.data));
    // .then((response) => console.log(response.data));
  }, [id]);

  return (
    <div>
      {/* <Icon name="mars"/> */}
      <h1>
        {singlePatient?.name ?? "unknown"}{" "}
        <Icon name={singlePatient?.gender === "male" ? "mars" : "venus"} />
      </h1>
      <div>ssn: {singlePatient?.ssn}</div>
      <div>occupation: {singlePatient?.occupation}</div>
    </div>
  );
  // return <div>SinglePatientPage</div>;
};

export default SinglePatientPage;
