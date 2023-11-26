import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../authentication/api.config";
import { IGoodDeed } from "../../interfaces/IGoodDeed";

export const removeUser = createAsyncThunk<IGoodDeed, any, any>(
  "/:id/users/remove",
  async (endpoint: string) => {
    return (await api.delete(endpoint)).data;
  }
);
