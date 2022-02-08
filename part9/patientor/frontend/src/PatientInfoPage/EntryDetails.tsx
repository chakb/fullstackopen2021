import React from 'react';
import { Header, Icon, List, SemanticCOLORS } from 'semantic-ui-react';
import { useStateValue } from '../state';
import { Entry, HealthCheckRating } from '../types';

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export const EntryDetails = ({ entry }: { entry: Entry }) => {
  const [{ diagnoses },] = useStateValue();

  const heartColor = (health: HealthCheckRating): SemanticCOLORS => {
    switch (health) {
      case HealthCheckRating.CriticalRisk:
        return 'purple';
      case HealthCheckRating.HighRisk:
        return 'red';
      case HealthCheckRating.LowRisk:
        return 'yellow';
      default:
        return 'green';
    }
  };

  switch (entry.type) {
    case 'Hospital':
      return (
        <>
          <Header as='h4'>{entry.date} <Icon name='hospital' /></Header>
          <p>Specialist: {entry.specialist}</p>
          <p>Discharge: {entry.discharge.date} {entry.discharge.criteria}</p>
          <p><em>{entry.description}</em></p>
          <List bulleted>
            {entry.diagnosisCodes?.map(code => {
              return <List.Item key={code}>
                {code} {diagnoses[code].name}
              </List.Item>;
            })}
          </List>
        </>
      );

    case 'HealthCheck':
      return (
        <>
          <Header as='h4'>{entry.date} <Icon name='user md' /></Header>
          <p>Specialist: {entry.specialist}</p>
          <p><em>{entry.description}</em></p>
          <p><Icon name='heart' color={heartColor(entry.healthCheckRating)} /></p>
          <List bulleted>
            {entry.diagnosisCodes?.map(code => {
              return <List.Item key={code}>
                {code} {diagnoses[code].name}
              </List.Item>;
            })}
          </List>
        </>
      );

    case 'OccupationalHealthcare':
      return (
        <>
          <Header as='h4'>{entry.date} <Icon name='stethoscope' /> {entry.employerName}</Header>
          <p>Specialist: {entry.specialist}</p>
          {entry.sickLeave
            ? <p>Sick leave: {entry.sickLeave.startDate}-{entry.sickLeave.endDate}</p>
            : null
          }
          <p><em>{entry.description}</em></p>
          <List bulleted>
            {entry.diagnosisCodes?.map(code => {
              return <List.Item key={code}>
                {code} {diagnoses[code].name}
              </List.Item>;
            })}
          </List>
        </>
      );

    default:
      return assertNever(entry);
  }


};
