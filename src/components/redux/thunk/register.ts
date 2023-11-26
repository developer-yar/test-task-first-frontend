import { HttpStatusCode } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import { api } from "../../authentication/api.config";
import { authenticate } from "./authenticate";
import { ISignUpData } from "../../interfaces/iSignUpData";
import { setSignInData } from "../rootReducer";

export const register = createAsyncThunk<
  ISignUpData,
  ISignUpData,
  {
    dispatch: AppDispatch;
  }
>("/sign-up", async (signUpData, { dispatch }) => {
  const response = await api.post(`sign-up`, signUpData);
  if (response.status === HttpStatusCode.Created) {
    const { email, password }: { email: string; password: string } =
      response.data;
    dispatch(setSignInData({ email, password }));
    dispatch(authenticate({ email, password }));
    return response.data;
  } else throw new Error("Some server error");
});
