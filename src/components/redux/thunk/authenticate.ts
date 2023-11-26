import { HttpStatusCode } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../store";
import { ISignInData } from "../../interfaces/iSignInData";
import { api } from "../../authentication/api.config";
import { setAccessToken } from "../../authentication/jwt";

export const authenticate = createAsyncThunk<ISignInData, ISignInData, any>(
  "/sign-in",
  async (signInData) => {
    const response = await api.post(`sign-in`, signInData);
    if (response.status === HttpStatusCode.Created) {
      setAccessToken(response.data.accessToken);
      return response.data.user;
    } else if (response.status === HttpStatusCode.Unauthorized)
      throw new Error("Invalid email or password");
    else throw new Error("Some server error");
  }
);
