import { createAsyncThunk } from "@reduxjs/toolkit";
import { IGoodDeed } from "../../interfaces/IGoodDeed";
import { api } from "../../authentication/api.config";

export const createGoodDeed = createAsyncThunk<IGoodDeed, any, any>(
  "/good-deeds/create",
  async (payload: { endpoint: string; goodDeed: IGoodDeed }) =>
    (await api.post(payload.endpoint, payload.goodDeed)).data
);
