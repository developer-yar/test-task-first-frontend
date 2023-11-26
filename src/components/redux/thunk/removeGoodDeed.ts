import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../authentication/api.config";
import { IGoodDeed } from "../../interfaces/IGoodDeed";

export const removeGoodDeed = createAsyncThunk<IGoodDeed, any, any>(
  "/good-deeds/remove/:id",
  async (endpoint: string, { dispatch }) =>
    (await api.delete(endpoint)).data
);
