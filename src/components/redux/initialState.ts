import { IReduxState } from "../interfaces/iReduxState";

export let initialState: IReduxState = {
  signUpData: {
    surname: "",
    name: "",
    email: "",
    password: "",
  },
  signInData: {
    email: "",
    password: "",
  },
  isInvalidData: false,
  isAuth: false,
  isAuthInProgress: true,
  user: {
    _id: "",
    surname: "",
    name: "",
    email: "",
    password: "",
  },
  goodDeeds: [],
  users: [],
  friends: [],
  friendGoodDeeds: {
    surname: "",
    name: "",
    goodDeeds: [],
    error: false,
  },
};
