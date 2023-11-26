import { createAsyncThunk } from "@reduxjs/toolkit";
import { IGoodDeed } from "../../interfaces/IGoodDeed";
import { api } from "../../authentication/api.config";

export const updateGoodDeed = createAsyncThunk<IGoodDeed, any, any>(
  "/good-deeds/update/:id",
  async (
    payload: { endpoint: string; goodDeed: Partial<IGoodDeed> }
  ) => (await api.put(payload.endpoint, payload.goodDeed)).data
);
