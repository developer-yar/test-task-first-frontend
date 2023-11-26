import { ChangeEventHandler, FormEventHandler } from "react";
import { ISignUpData } from "./iSignUpData";

export interface ISignUpProps {
  signUpData: ISignUpData;
  handleSurname: ChangeEventHandler;
  handleName: ChangeEventHandler;
  handleEmail: ChangeEventHandler;
  handlePassword: ChangeEventHandler;
  handleSubmit: FormEventHandler;
}
