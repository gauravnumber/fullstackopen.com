import React from "react";
import { Modal, Segment } from "semantic-ui-react";
import AddEntryForm, { EntryFormValues } from "./AddEntryForm";
// import AddPatientForm, { PatientFormValues } from './AddPatientForm';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValues) => void;
  error?: string;
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => {
  // return ("hello");
  return (
    <div>
      <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
        <Modal.Header>Add a new Entry</Modal.Header>
        <Modal.Content>
          {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
          <AddEntryForm onCancel={onClose} onSubmit={onSubmit} />
        </Modal.Content>
      </Modal>
    </div>
  );
};

export default AddEntryModal;
