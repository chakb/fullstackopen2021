import { Diagnosis } from "../types";
import diagnosis from "../../data/diagnoses";

const getDiagnoses = ():Diagnosis[] => {
  return diagnosis;
};

export default { getDiagnoses };