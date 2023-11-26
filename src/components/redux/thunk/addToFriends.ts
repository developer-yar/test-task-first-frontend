import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../authentication/api.config";
import { IFriend } from "../../interfaces/IFriend";

export const addToFriends = createAsyncThunk<IFriend, any, any>(
  "/friends/add",
  async (payload: { endpoint: string; friend: IFriend }) =>
    (await api.post(payload.endpoint, payload.friend)).data
);
