import { AppDispatch, RootState } from "./redux/store";
import { setSignInData } from "./redux/rootReducer";
import { authenticate } from "./redux/thunk/authenticate";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { PrivateRouteHOC } from "./privateRouteHOC";
import { ISignInData } from "./interfaces/iSignInData";
import { ISignInProps } from "./interfaces/iSignInProps";
import { SignIn } from "./signIn";

export const SignInContainer = PrivateRouteHOC((): JSX.Element => {
  const signInData: ISignInData = useAppSelector(
    (state: RootState) => state.signInData
  );
  const isInvalidData: boolean = useAppSelector(
    (state: RootState) => state.isInvalidData
  );

  const dispatch: AppDispatch = useAppDispatch();

  const handleSurname: React.ChangeEventHandler<HTMLFormElement> = (
    e: React.ChangeEvent<HTMLFormElement>
  ) => {
    dispatch(
      setSignInData({
        surname: e.target.value,
      })
    );
  };

  const handleName: React.ChangeEventHandler<HTMLFormElement> = (
    e: React.ChangeEvent<HTMLFormElement>
  ) => {
    dispatch(
      setSignInData({
        name: e.target.value,
      })
    );
  };

  const handleEmail: React.ChangeEventHandler<HTMLFormElement> = (
    e: React.ChangeEvent<HTMLFormElement>
  ) => {
    dispatch(
      setSignInData({
        email: e.target.value,
      })
    );
  };

  const handlePassword: React.ChangeEventHandler<HTMLFormElement> = (
    e: React.ChangeEvent<HTMLFormElement>
  ) => {
    dispatch(
      setSignInData({
        password: e.target.value,
      })
    );
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    dispatch(authenticate(signInData));
  };

  const props: ISignInProps = {
    signInData,
    handleEmail,
    handlePassword,
    handleSubmit,
    isInvalidData,
  };

  return <SignIn {...props} />;
});
