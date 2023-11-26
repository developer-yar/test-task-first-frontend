import { useContext, useEffect } from "react";
import { UserContext } from "./context/user";
import { getUserGoodDeeds } from "./redux/thunk/getUserGoodDeeds";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { PrivateRouteHOC } from "./privateRouteHOC";
import { IUser } from "./interfaces/IUser";
import { IGoodDeed } from "./interfaces/IGoodDeed";
import { Header } from "./header";
import { UpdateGoodDeed } from "./updateGoodDeed";
import { DeleteGoodDeed } from "./deleteGoodDeed";
import { CreateGoodDeed } from "./createGoodDeed";
import { Title } from "./title";
import { AppDispatch } from "./redux/store";
import { displayDate } from "./functions/dispalyDate";

export const UserGoodDeeds = PrivateRouteHOC((): JSX.Element | undefined => {
  const items: IGoodDeed[] = useAppSelector((state) => state.goodDeeds);

  const dispatch: AppDispatch = useAppDispatch();

  const thisUser = useContext<IUser>(UserContext);

  useEffect(() => {
    dispatch(getUserGoodDeeds(`${thisUser._id}/good-deeds`));
  }, []);

  return (
    <>
      <Header />
      <div className="flex flex-col md:flex-row justify-end md:justify-between items-start gap-8 md:gap-0 mb-8">
        <Title text="Мои добрые дела" />
        <CreateGoodDeed user={thisUser} />
      </div>
      {!items || items.length === 0 ? (
        <p className="font-bold text-center">Нет записей</p>
      ) : (
        <ul className="grid gap-8">
          {items.map((item: any) => (
            <li
              key={item._id}
              className="grid gap-8 p-8 bg-blue-300 rounded-xl"
            >
              <p className="text-xl font-bold justify-end break-all">
                {item.title}
              </p>
              <div className="grid gap-8 md:flex md:gap-0 justify-between items-center w-full">
                <div className="flex flex-row gap-8">
                  <UpdateGoodDeed goodDeed={item} />
                  <DeleteGoodDeed goodDeed={item} />
                </div>
                <p className="text-md font-bold">{displayDate(item.date)}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
});
