import { ChangeEventHandler, FormEventHandler } from "react";
import { ISignInData } from "./iSignInData";

export interface ISignInProps {
  signInData: ISignInData;
  handleEmail: ChangeEventHandler;
  handlePassword: ChangeEventHandler;
  handleSubmit: FormEventHandler;
  isInvalidData: boolean;
}
