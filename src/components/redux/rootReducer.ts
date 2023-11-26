import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { initialState } from "./initialState";
import { getUserGoodDeeds } from "./thunk/getUserGoodDeeds";
import { authenticate } from "./thunk/authenticate";
import { RootState } from "./store";
import { removeGoodDeed } from "./thunk/removeGoodDeed";
import { IGoodDeed } from "../interfaces/IGoodDeed";
import { IFriend } from "../interfaces/IFriend";
import { IReduxState } from "../interfaces/iReduxState";
import { updateGoodDeed } from "./thunk/updateGoodDeed";
import { createGoodDeed } from "./thunk/createGoodDeed";
import { updateUser } from "./thunk/updateUser";
import { removeUser } from "./thunk/removeUser";
import { sortByDate } from "../functions/sortByDate";
import { getUsers } from "./thunk/getUsers";
import { getFriends } from "./thunk/getFriends";
import { addToFriends } from "./thunk/addToFriends";
import { removeFromFriends } from "./thunk/removeFromFriends";
import { getFriendGoodDeeds } from "./thunk/getFriendGoodDeeds";

export const slice = createSlice({
  name: "reducer",
  initialState: initialState as any,

  reducers: {
    setSignUpData(state: IReduxState, action: PayloadAction<any>) {
      state.signUpData = {
        ...state.signUpData,
        ...action.payload,
      };
    },

    setSignInData(state: IReduxState, action: PayloadAction<any>) {
      state.signInData = {
        ...state.signInData,
        ...action.payload,
      };
    },

    setIsInvalidData(state: IReduxState, action: PayloadAction<any>) {
      state.isInvalidData = action.payload;
    },

    setIsAuth(state: IReduxState, action: PayloadAction<any>) {
      state.isAuth = action.payload;
    },

    setIsAuthInProgress(state: IReduxState, action: PayloadAction<any>) {
      state.isAuthInProgress = action.payload;
    },

    setUser(state: IReduxState, action: PayloadAction<any>) {
      state.user = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(
      authenticate.fulfilled,
      (state: IReduxState, action: PayloadAction<any>) => {
        state.isInvalidData = false;
        state.signInData = { email: "", password: "" };
        state.user = action.payload;
        state.isAuth = true;
      }
    );

    builder.addCase(
      authenticate.rejected,
      (state: IReduxState, action: PayloadAction<any>) => {
        state.isInvalidData = true;
      }
    );

    builder.addCase(
      getUserGoodDeeds.fulfilled,
      (state: IReduxState, action: PayloadAction<any>) => {
        state.goodDeeds = action.payload;
      }
    );

    builder.addCase(
      updateUser.fulfilled,
      (state: IReduxState, action: PayloadAction<any>) => {
        state.user = action.payload;
      }
    );

    builder.addCase(
      createGoodDeed.fulfilled,
      (state: IReduxState, action: PayloadAction<any>) => {
        state.goodDeeds.push(action.payload);
        sortByDate(state.goodDeeds);
      }
    );

    builder.addCase(
      removeGoodDeed.fulfilled,
      (state: IReduxState, action: PayloadAction<any>) => {
        state.goodDeeds = state.goodDeeds.filter(
          (item: IGoodDeed) => item._id !== action.payload._id
        );
      }
    );

    builder.addCase(
      updateGoodDeed.fulfilled,
      (state: IReduxState, action: PayloadAction<any>) => {
        state.goodDeeds = state.goodDeeds.map((item: IGoodDeed) =>
          item._id === action.payload._id ? action.payload : item
        );
        sortByDate(state.goodDeeds);
      }
    );

    builder.addCase(
      getUsers.fulfilled,
      (state: IReduxState, action: PayloadAction<any>) => {
        state.users = action.payload;
      }
    );

    builder.addCase(
      getFriends.fulfilled,
      (state: IReduxState, action: PayloadAction<any>) => {
        state.friends = action.payload;
      }
    );

    builder.addCase(
      addToFriends.fulfilled,
      (state: IReduxState, action: PayloadAction<any>) => {
        state.friends.push(action.payload);
      }
    );

    builder.addCase(
      removeFromFriends.fulfilled,
      (state: IReduxState, action: PayloadAction<any>) => {
        state.friends = state.friends.filter(
          (item: IFriend) => item._id !== action.payload._id
        );
      }
    );

    builder.addCase(
      getFriendGoodDeeds.fulfilled,
      (state: IReduxState, action: PayloadAction<any>) => {
        state.friendGoodDeeds = action.payload;
      }
    );

    builder.addCase(getFriendGoodDeeds.rejected, (state: IReduxState) => {
      state.friendGoodDeeds.error = true;
    });

    builder.addCase<typeof HYDRATE, PayloadAction<RootState, typeof HYDRATE>>(
      HYDRATE,
      (state, { payload }) => ({ ...state, ...payload.reducer })
    );
  },
});

const { actions, reducer } = slice;

export const {
  setSignUpData,
  setSignInData,
  setIsInvalidData,
  setIsAuth,
  setIsAuthInProgress,
  setUser,
} = actions;

export default slice;
