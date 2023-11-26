import { createContext } from "react";
import { useAppSelector } from "../redux/hooks";
import { IUser } from "../interfaces/IUser";

const userContextObject: IUser = {
  _id: "",
  surname: "",
  name: "",
  email: "",
  password: "",
};

export const UserContext = createContext<IUser>(userContextObject);

export const UserContextProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const user: IUser = useAppSelector((state) => state.user);
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
