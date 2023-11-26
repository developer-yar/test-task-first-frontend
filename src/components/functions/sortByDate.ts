import { IGoodDeed } from "../interfaces/IGoodDeed";

export const sortByDate = (goodDeeds: IGoodDeed[]): IGoodDeed[] =>
  goodDeeds.sort(
    (a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf()
  );
