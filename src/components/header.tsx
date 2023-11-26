import { useContext } from "react";
import Link from "next/link";
import { UserContext } from "./context/user";
import { IUser } from "./interfaces/IUser";
import { removeAccessToken } from "./authentication/jwt";
import { NextRouter, useRouter } from "next/router";
import { AppDispatch } from "./redux/store";
import { setIsAuth } from "./redux/rootReducer";
import { useAppDispatch } from "./redux/hooks";
import { Title } from "./title";
import { CustomLink } from "./customLink";

export const Header = (): JSX.Element => {
  const thisUser = useContext<IUser>(UserContext);

  const router: NextRouter = useRouter();

  const dispatch: AppDispatch = useAppDispatch();

  const logOut = () => {
    dispatch(setIsAuth(false));
    removeAccessToken();
  };

  return (
    <header className="py-8 border-b-2 border-gray mb-8 relative md:sticky inset-0 max-w-6xl m-auto bg-white">
      <div className="flex flex-col gap-8 lg:gap-0 lg:flex-row justify-between items-center">
        <Link href="/">
          <Title text={`${thisUser.surname} ${thisUser.name}`} />
        </Link>
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <CustomLink href={"/friends"} text="  Мои друзья" />
          <CustomLink href={"/users"} text=" Все пользователи" />
          <CustomLink href={"/settings"} text=" Настройки" />
          <button className="button w-32" onClick={logOut}>
            Выйти
          </button>
        </div>
      </div>
    </header>
  );
};
