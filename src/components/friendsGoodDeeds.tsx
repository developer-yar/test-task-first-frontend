import { useContext, useEffect } from "react";
import { UserContext } from "./context/user";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { PrivateRouteHOC } from "./privateRouteHOC";
import { IUser } from "./interfaces/IUser";
import { IGoodDeed } from "./interfaces/IGoodDeed";
import { Header } from "./header";
import { Title } from "./title";
import { AppDispatch } from "./redux/store";
import { NextRouter, useRouter } from "next/router";
import { getFriendGoodDeeds } from "./redux/thunk/getFriendGoodDeeds";
import { IFriendGoodDeeds } from "./interfaces/IFriendGoodDeeds";
import { displayDate } from "./functions/dispalyDate";

export const FriendsGoodDeeds = PrivateRouteHOC((): JSX.Element | undefined => {
  const dispatch: AppDispatch = useAppDispatch();

  const friendGoodDeeds: IFriendGoodDeeds = useAppSelector(
    (state) => state.friendGoodDeeds
  );

  const thisUser = useContext<IUser>(UserContext);

  const router: NextRouter = useRouter();
  const { id: friendId }: { id?: string } = router.query;

  const isParsedUrlParam: boolean = router.isReady;

  useEffect(() => {
    if (isParsedUrlParam)
      dispatch(getFriendGoodDeeds(`${thisUser._id}/good-deeds/${friendId}`));
  }, [isParsedUrlParam]);

  return (
    <>
      <Header />
      {!friendGoodDeeds ? (
        <p className="text-center font-bold">Загрузка...</p>
      ) : friendGoodDeeds.error ? (
        <p className="text-center font-bold">
          У Вас нет доступа к списку добрых дел данного пользователя, так как он
          не является Вашим другом
        </p>
      ) : (
        <>
          <div className="mb-8">
            <Title
              text={`Добрые дела пользователя ${friendGoodDeeds.surname} ${friendGoodDeeds.name}`}
            />
          </div>
          {friendGoodDeeds.goodDeeds.length === 0 ? (
            <p className="font-bold text-center">Нет записей</p>
          ) : (
            <ul className="grid gap-8">
              {friendGoodDeeds.goodDeeds.map((item: IGoodDeed) => (
                <li
                  key={item._id}
                  className="grid gap-8 p-8 bg-blue-300 rounded-xl"
                >
                  <p className="text-xl font-bold justify-end break-all">
                    {item.title}
                  </p>
                  <div className="grid gap-8 md:flex md:gap-0 justify-between friendGoodDeeds-center w-full">
                    <p className="text-md font-bold">
                      {displayDate(item.date)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </>
  );
});
