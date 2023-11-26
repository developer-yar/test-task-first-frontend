import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUser } from "../../interfaces/IUser";
import { api } from "../../authentication/api.config";

export const getUsers = createAsyncThunk<IUser[], string, any>(
  "/users",
  async (endpoint: string, { dispatch }) => (await api.get(endpoint)).data
);
