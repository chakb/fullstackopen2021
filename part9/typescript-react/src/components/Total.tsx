const Total = ({ courseParts }: { courseParts: { name: string, exerciseCount: number }[] }) => {
  return (
    <div>
      Number of exercises{" "}
      {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </div>
  )
}

export default Total