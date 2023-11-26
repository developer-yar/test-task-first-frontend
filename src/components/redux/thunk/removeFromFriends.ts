import { createAsyncThunk } from "@reduxjs/toolkit";
import { IFriend } from "../../interfaces/IFriend";
import { api } from "../../authentication/api.config";

export const removeFromFriends = createAsyncThunk<IFriend, any, any>(
  "/friends/remove",
  async (payload: { endpoint: string; friend: IFriend }) =>
    (await api.delete(payload.endpoint, { data: payload.friend })).data
);
