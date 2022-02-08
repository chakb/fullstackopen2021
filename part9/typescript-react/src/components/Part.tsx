import { CoursePart } from "../types"

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ coursePart }: { coursePart: CoursePart }) => {
  switch (coursePart.type) {
    case 'normal':
      return (
        <p>
          <div><b>{coursePart.name} {coursePart.exerciseCount}</b></div>
          <div><em>{coursePart.description}</em></div>
        </p>
      )
    case 'groupProject':
      return (
        <p>
          <div><b>{coursePart.name} {coursePart.exerciseCount}</b></div>
          <div>project exercises {coursePart.groupProjectCount}</div>
        </p>
      )
    case 'submission':
      return (
        <p>
          <div><b>{coursePart.name} {coursePart.exerciseCount}</b></div>
          <div><em>{coursePart.description}</em></div>
          <div>submit to {coursePart.exerciseSubmissionLink}</div>
        </p>
      )

    case 'special':
      return (
        <p>
          <div><b>{coursePart.name} {coursePart.exerciseCount}</b></div>
          <div><em>{coursePart.description}</em></div>
          <div>required skills {coursePart.requirements.join(', ')}</div>
        </p>
      )

    default:
      assertNever(coursePart)
      return null;
  }
}

export default Part