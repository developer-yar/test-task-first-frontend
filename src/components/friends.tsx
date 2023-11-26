import { useContext, useEffect } from "react";
import Link from "next/link";
import { UserContext } from "./context/user";
import { IUser } from "./interfaces/IUser";
import { Header } from "./header";
import { Title } from "./title";
import { PrivateRouteHOC } from "./privateRouteHOC";
import { AppDispatch } from "./redux/store";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { getFriends } from "./redux/thunk/getFriends";
import { IFriend } from "./interfaces/IFriend";
import { removeFromFriends } from "./redux/thunk/removeFromFriends";

export const FriendsList = PrivateRouteHOC((): JSX.Element => {
  const friends: IFriend[] = useAppSelector((state) => state.friends);
  const users: IUser[] = useAppSelector((state) => state.users);
  const dispatch: AppDispatch = useAppDispatch();

  const thisUser = useContext<IUser>(UserContext)._id;

  useEffect(() => {
    dispatch(getFriends(`${thisUser}/friends`));
  }, []);

  const remove = (friendId: string) => {
    dispatch(
      removeFromFriends({
        endpoint: "/friends/remove",
        friend: { initiatorId: thisUser, receiverId: friendId },
      })
    );
  };

  return (
    <>
      <Header />
      <div className="flex flex-col gap-8">
        <Title text="Список моих друзей" />
        {!friends || friends.length === 0 ? (
          <p className="font-bold text-center black">Нет друзей</p>
        ) : (
          <ul className="flex flex-col gap-8">
            {users.map((user: IUser) => {
              if (
                friends.find(
                  (friend) =>
                    friend.initiatorId === user._id ||
                    friend.receiverId === user._id
                ) &&
                user._id != thisUser
              ) {
                return (
                  <li
                    key={user._id}
                    className="flex flex-row justify-between items-center border-b-2 pb-8"
                  >
                    <div className="flex flex-col gap-8">
                      <p className="text-xl font-bold">
                        {user.surname} {user.name}
                      </p>
                      <Link href={`/good-deeds/${user._id}`}>
                        Посмотреть добрые дела
                      </Link>
                      <button
                        className="button w-48"
                        onClick={() => remove(user._id)}
                      >
                        Удалить из друзей
                      </button>
                    </div>
                  </li>
                );
              }
            })}
          </ul>
        )}
      </div>
    </>
  );
});
