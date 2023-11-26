import { AnyAction, combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { ThunkDispatch } from "redux-thunk";
import { createWrapper } from "next-redux-wrapper";
import { initialState } from "./initialState";
import slice from "./rootReducer";

const persistConfig = {
  key: "root",
  storage,
  version: 1,
  whitelist: ["user", "goodDeeds", "users", "friends"],
};

const persistedReducer = persistReducer(persistConfig, slice.reducer);

export const store = configureStore({
  reducer: persistedReducer,
  preloadedState: initialState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const makeStore = () => store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const wrapper = createWrapper<ReturnType<typeof makeStore>>(makeStore);
