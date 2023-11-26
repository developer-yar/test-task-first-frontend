import { createAsyncThunk } from "@reduxjs/toolkit";
import { IFriendGoodDeeds } from "../../interfaces/IFriendGoodDeeds";
import { api } from "../../authentication/api.config";

export const getFriendGoodDeeds = createAsyncThunk<
  IFriendGoodDeeds[],
  string,
  any
>(
  "/:user_id/good-deeds/:friend_id",
  async (endpoint: string) => (await api.get(endpoint)).data
);
