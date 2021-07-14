import React from "react";
import { Formik, Form, Field } from "formik";
import {
  NumberField,
  DiagnosisSelection,
  TextField,
} from "../AddPatientModal/FormField";
import { Grid, Button } from "semantic-ui-react";
import {
  Entry,
  // HealthCheckEntry,
  // HealthCheckRating,
} from "../types";
import { useStateValue } from "../state";

export type EntryFormValues = Omit<Entry, "id" | "diagnosisCodes">;
// export type EntryFormValues = Omit<
//   HealthCheckEntry,
//   "id" | "type" | "diagnosisCodes"
// >;

interface Props {
  onCancel: () => void;
  // onSubmit: (values: Omit<HealthCheckEntry, "id">) => void;
  onSubmit: (values: EntryFormValues) => void;
}
const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  // const AddEntryForm = () => {
  // const AddEntryForm = ({ onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();
  const [healthCheck, setHealthCheck] = React.useState<boolean>(true);
  const [hospital, setHospital] = React.useState<boolean>(false);
  const [occupationalHealthcare, setOccupationalHealthcare] =
    React.useState<boolean>(false);

  return (
    // <Formik
    //   initialValues={{}}
    //   onSubmit={onSubmit}
    //   validate={(values) => {
    //     /// ...
    //   }}
    // >
    <Formik
      initialValues={{
        date: "",
        type: "HealthCheck",
        specialist: "",
        description: "",
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        // healthCheckRating: HealthCheckRating.LowRisk,
        // healthCheckRating: "",
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        // const requiredError = "Field is required";

        if (values.type === "HealthCheck") {
          setHealthCheck(true);
          setHospital(false);
          setOccupationalHealthcare(false);
        }

        if (values.type === "Hospital") {
          setHospital(true);
          setHealthCheck(false);
          setOccupationalHealthcare(false);
        }

        if (values.type === "OccupationalHealthcare") {
          setOccupationalHealthcare(true);
          setHealthCheck(false);
          setHospital(false);
        }
        return;
      }}
      // onSubmit={() => console.log("Formik submit")}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
      {/* {() => { */}
        //  {({  setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <Field
              label="Type"
              placeholder="Type"
              name="type"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            {healthCheck && (
              <Field
                label="healthCheckRating"
                name="healthCheckRating"
                component={NumberField}
                min={0}
                max={3}
              />
            )}
            {/* {console.log("onSubmit", onSubmit)} */}
            {/* {type === "OccupationalHealthcare" && ( */}
            {occupationalHealthcare && (
              <div>
                <Field
                  label="Sick Leave Start Date"
                  placeholder="YYYY-MM-DD"
                  name="sickLeave.startDate"
                  // placeholder="Sick Leave Start Date"
                  // name="sick_leave_start_date"
                  component={TextField}
                />
                <Field
                  label="Sick Leave End Date"
                  placeholder="YYYY-MM-DD"
                  name="sickLeave.endDate"
                  // placeholder="Sick Leave End Date"
                  // name="sick_leave_end_date"
                  component={TextField}
                />
              </div>
            )}
            {hospital && (
              <div>
                <Field
                  label="Discharge Date"
                  placeholder="YYYY-MM-DD"
                  name="discharge.date"
                  component={TextField}
                />
                <Field
                  label="Discharge Criteria"
                  placeholder="Criteria"
                  name="discharge.criteria"
                  component={TextField}
                />
              </div>
            )}
            <Grid>
              <Grid.Column floated="left" width={5}>
                {/* <Button type="button" color="red"> */}
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};
export default AddEntryForm;
