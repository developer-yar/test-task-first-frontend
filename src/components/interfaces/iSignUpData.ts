import { ISignInData } from "./iSignInData";
export interface ISignUpData extends ISignInData {
  _id?: string;
  surname: string;
  name: string;
}
