import { NewPatient, Gender, NewEntry, BaseEntry, Diagnosis, HealthCheckRating, Discharge, SickLeave } from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewPatient = (object: any): NewPatient => {
  const newPatient = {
    name: parseString(object.name, 'name'),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseString(object.ssn, 'ssn'),
    gender: parseGender(object.gender),
    occupation: parseString(object.occupation, 'occupation')
  };

  return newPatient;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewEntry = (object: any): NewEntry => {
  const baseEntry: Omit<BaseEntry, 'id'> = {
    description: parseString(object.description, 'description'),
    date: parseDate(object.date),
    specialist: parseString(object.specialist, 'specialist'),
  };

  if (object.diagnosisCodes) {
    baseEntry.diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes);
  }

  if (!object.type || !isString(object.type)) {
    throw new Error('Invalid or missing entry type');
  }
  switch (object.type) {
    case 'HealthCheck':
      return {
        ...baseEntry,
        type: 'HealthCheck',
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
      };
    case 'Hospital':
      return {
        ...baseEntry,
        type: 'Hospital',
        discharge: parseDischarge(object.discharge)
      };
    case 'OccupationalHealthcare':
      let sickLeave;
      if (object.sickLeave.startDate || object.sickLeave.endDate) {
        sickLeave = parseSickLeave(object.sickLeave);
      }
      return {
        ...baseEntry,
        type: 'OccupationalHealthcare',
        employerName: parseString(object.employerName, 'employerName'),
        sickLeave
      };
    default:
      throw new Error('Incorrect Entry');
  }

};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseSickLeave = (sickLeave: any): SickLeave => {
  if (!sickLeave || !sickLeave.startDate || !sickLeave.endDate) {
    throw new Error('Incorrect or missing sick leave dates');
  }
  return {
    startDate: parseDate(sickLeave.startDate),
    endDate: parseDate(sickLeave.endDate),
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseDischarge = (discharge: any): Discharge => {
  if (!discharge || !discharge.date || !discharge.criteria) {
    throw new Error('Incorrect or missing discharge');
  }
  return {
    date: parseDate(discharge.date),
    criteria: parseString(discharge.criteria, 'criteria')
  };
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (rating == null || !isHealthCheckRating(rating)) {
    throw new Error('Incorrect or missing health rating');
  }
  return rating;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param as HealthCheckRating);
};

const parseDiagnosisCodes = (codes: unknown): Array<Diagnosis['code']> => {
  if (!Array.isArray(codes) || !codes.every(c => isString(c))) {
    throw new Error('Incorrect diagnosis codes');
  }

  return codes as Array<Diagnosis['code']>;
};

const parseString = (str: unknown, strName: string): string => {
  if (!str || !isString(str)) {
    throw new Error(`Incorrect or missing ${strName}: ${str}`);
  }

  return str;
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing date: ${date}`);
  }
  return date;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender: ${gender}`);
  }
  return gender;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param as Gender);
};