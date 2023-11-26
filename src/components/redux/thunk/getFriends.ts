import { createAsyncThunk } from "@reduxjs/toolkit";
import { IFriend } from "../../interfaces/IFriend";
import { api } from "../../authentication//api.config";

export const getFriends = createAsyncThunk<IFriend[], string, any>(
  "/:id/friends",
  async (endpoint: string, { dispatch }) => (await api.get(endpoint)).data
);
