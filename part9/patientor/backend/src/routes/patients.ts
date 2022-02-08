import express from 'express';
import patientService from '../services/patientsService';
import { toNewPatient, toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatientsWithoutSSn());
});

router.get('/:id', (req, res) => {
  res.send(patientService.getPatientById(req.params.id));
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);

    const addedPatient = patientService.addPatient(newPatient);

    res.status(200).json(addedPatient);
  } catch (error) {
    res.status(400).send({ error: (error as Error).message });
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const newEntry = toNewEntry(req.body);

    const addedEntry = patientService.addEntry(newEntry, req.params.id);

    res.status(200).json(addedEntry);
  } catch (error) {
    res.status(400).send({ error: (error as Error).message });
  }
});

export default router;