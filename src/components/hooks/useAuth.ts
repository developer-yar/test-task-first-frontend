import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setIsAuth, setIsAuthInProgress } from "../redux/rootReducer";
import { getAccessToken } from "../authentication/jwt";
import { AppDispatch } from "../redux/store";
import { useEffect } from "react";

export const useAuth = () => {
  const isAuth: boolean = useAppSelector((state) => state.isAuth);
  const isAuthInProgress: boolean = useAppSelector(
    (state) => state.isAuthInProgress
  );

  const dispatch: AppDispatch = useAppDispatch();

  const checkAuth = async () => {
    dispatch(setIsAuth(getAccessToken() ? true : false));
    dispatch(setIsAuthInProgress(false));
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return { isAuth, isAuthInProgress };
};
