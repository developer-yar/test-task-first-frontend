import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUser } from "../../interfaces/IUser";
import { api } from "../../authentication/api.config";

export const updateUser = createAsyncThunk<IUser, any, any>(
  "/:id/users/update",
  async (payload: { endpoint: string; user: Partial<IUser> }) =>
    (await api.put(payload.endpoint, payload.user)).data
);
