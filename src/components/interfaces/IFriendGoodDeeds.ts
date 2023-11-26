import { IGoodDeed } from "./IGoodDeed";

export interface IFriendGoodDeeds {
  surname: string;
  name: string;
  goodDeeds: IGoodDeed[];
  error?: boolean;
}
