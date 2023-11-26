import { createAsyncThunk } from "@reduxjs/toolkit";
import { IGoodDeed } from "../../interfaces/IGoodDeed";
import { api } from "../../authentication/api.config";

export const getUserGoodDeeds = createAsyncThunk<IGoodDeed[], string, any>(
  "/:id/good-deeds",
  async (endpoint: string, { dispatch }) => (await api.get(endpoint)).data
);
