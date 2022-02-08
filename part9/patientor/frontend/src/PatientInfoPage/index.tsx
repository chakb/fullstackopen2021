import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { setSelectedPatient, addEntry, useStateValue } from "../state";
import { apiBaseUrl } from "../constants";
import { Gender, Patient, Entry } from "../types";
import { Container, Header, Icon, SemanticICONS, Segment, Button } from "semantic-ui-react";
import { EntryDetails } from "./EntryDetails";
import AddEntryModal from "../AddEntryModal";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";


const PatientInfoPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ selectedPatient }, dispatch] = useStateValue();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    const formattedValues = values.type === 'Hospital'
      ? {
        description: values.description,
        date: values.date,
        specialist: values.specialist,
        type: 'Hospital',
        diagnosisCodes: values.diagnosisCodes,
        discharge: { date: values.dischargeDate, criteria: values.dischargeCriteria }
      }
      : values;

    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        formattedValues
      );
      dispatch(addEntry(newEntry, selectedPatient as Patient));
      closeModal();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.error(e.response?.data || 'Unknown Error');
      setError(e.response?.data?.error || 'Unknown error');
    }
  };

  useEffect(() => {
    const getPatient = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(setSelectedPatient(patientFromApi));
      } catch (e) {
        console.error(e);
      }
    };

    if (!selectedPatient || selectedPatient.id !== id) {
      void getPatient();
    }
  }, [id]);

  const getIcon = (gender: Gender): SemanticICONS => {
    if (gender === Gender.Male) {
      return 'mars';
    } else if (gender === Gender.Female) {
      return 'venus';
    } else {
      return 'genderless';
    }
  };

  if (!selectedPatient) {
    return null;
  }

  return (
    <>
      <Container>
        <Header as='h2'>{selectedPatient?.name} <Icon name={getIcon(selectedPatient.gender)} /></Header>
        <div>ssn: {selectedPatient?.ssn}</div>
        <div>occupation: {selectedPatient?.occupation}</div>
        <Header as='h3'>entries</Header>
        {selectedPatient?.entries.map(entry => {
          return (
            <Segment key={entry.id}>
              <EntryDetails entry={entry} />
            </Segment>
          );
        })}
      </Container>
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />

      <Button onClick={() => openModal()}>Add New Entry</Button>
    </>
  );
};

export default PatientInfoPage;