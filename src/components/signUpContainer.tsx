import { SignUp } from "./signUp";
import { AppDispatch, RootState } from "./redux/store";
import { setSignUpData } from "./redux/rootReducer";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { ISignUpData } from "./interfaces/iSignUpData";
import { ISignUpProps } from "./interfaces/iSignUpProps";
import { register } from "./redux/thunk/register";
import { PrivateRouteHOC } from "./privateRouteHOC";

export const SignUpContainer = PrivateRouteHOC((): JSX.Element => {
  const signUpData: ISignUpData = useAppSelector(
    (state: RootState) => state.signUpData
  );

  const dispatch: AppDispatch = useAppDispatch();

  const handleSurname: React.ChangeEventHandler<HTMLFormElement> = (
    e: React.ChangeEvent<HTMLFormElement>
  ) => {
    dispatch(
      setSignUpData({
        surname: e.target.value,
      })
    );
  };

  const handleName: React.ChangeEventHandler<HTMLFormElement> = (
    e: React.ChangeEvent<HTMLFormElement>
  ) => {
    dispatch(
      setSignUpData({
        name: e.target.value,
      })
    );
  };

  const handleEmail: React.ChangeEventHandler<HTMLFormElement> = (
    e: React.ChangeEvent<HTMLFormElement>
  ) => {
    dispatch(
      setSignUpData({
        email: e.target.value,
      })
    );
  };

  const handlePassword: React.ChangeEventHandler<HTMLFormElement> = (
    e: React.ChangeEvent<HTMLFormElement>
  ) => {
    dispatch(
      setSignUpData({
        password: e.target.value,
      })
    );
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    dispatch(register(signUpData));
  };

  const props: ISignUpProps = {
    signUpData,
    handleSurname,
    handleName,
    handleEmail,
    handlePassword,
    handleSubmit,
  };

  return <SignUp {...props} />;
});
