import { Entry, NewEntry, NewPatient, Patient, PublicPatient } from "../types";
import patients from "../../data/patients";
import { v1 as uuid } from 'uuid';

const getPatientsWithoutSSn = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  })
  );
};

const getPatientById = (patiendId: string): Patient | undefined => {
  return patients.find(p => p.id === patiendId);
};

const addPatient = (patient: NewPatient): Patient => {

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const id: string = uuid();

  const newPatient = {
    id,
    ...patient,
    entries: []
  };

  patients.push(newPatient);
  return newPatient;
};

const addEntry = (newEntry: NewEntry, patientId: string): Entry | null => {
  const entry = { ...newEntry, id: uuid() };
  const patient = getPatientById(patientId);

  if (patient) {
    patient.entries.push(entry);
    return entry;
  } else {
    throw new Error('Patient not found');
  }
};

export default {
  getPatientsWithoutSSn,
  addPatient,
  getPatientById,
  addEntry
};