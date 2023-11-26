import { useContext } from "react";
import { UserContext } from "./context/user";
import { IUser } from "./interfaces/IUser";
import { Header } from "./header";
import { useAppDispatch } from "./redux/hooks";
import { AppDispatch } from "./redux/store";
import { setIsAuth } from "./redux/rootReducer";
import { removeUser } from "./redux/thunk/removeUser";
import { UpdateUser } from "./updateUser";
import { PrivateRouteHOC } from "./privateRouteHOC";
import { Title } from "./title";
import { removeAccessToken } from "./authentication/jwt";

export const SettingsList = PrivateRouteHOC((): JSX.Element => {
  const dispatch: AppDispatch = useAppDispatch();

  const thisUser = useContext<IUser>(UserContext);

  const remove = () => {
    dispatch(removeUser(`${thisUser._id}/users/remove`));
    dispatch(setIsAuth(false));
    removeAccessToken();
  };

  return (
    <>
      <Header />
      <div className="flex flex-col gap-8">
        <Title text="Моя учётная запись" />
        <UpdateUser user={thisUser} />
        <div className="grid gap-2">
          <p>Фамилия</p>
          <p className="text-xl font-bold"> {thisUser.surname}</p>
        </div>
        <div className="grid gap-2">
          <p>Имя</p>
          <p className="text-xl font-bold"> {thisUser.name}</p>
        </div>
        <div className="grid gap-2">
          <p>Электронная почта</p>
          <p className="text-xl font-bold"> {thisUser.email}</p>
        </div>
        <div className="grid gap-2">
          <p>Пароль</p>
          <p className="text-xl font-bold"> {thisUser.password}</p>
        </div>
        <button className="button w-48" onClick={remove}>
          Удалить аккаунт
        </button>
      </div>
    </>
  );
});
