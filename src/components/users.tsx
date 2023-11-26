import { useContext, useEffect } from "react";
import { IUser } from "./interfaces/IUser";
import { Header } from "./header";
import { PrivateRouteHOC } from "./privateRouteHOC";
import { Title } from "./title";
import { AppDispatch } from "./redux/store";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { getUsers } from "./redux/thunk/getUsers";
import { addToFriends } from "./redux/thunk/addToFriends";
import { getFriends } from "./redux/thunk/getFriends";
import { IFriend } from "./interfaces/IFriend";
import { UserContext } from "./context/user";

export const UsersList = PrivateRouteHOC((): JSX.Element => {
  const friends: IFriend[] = useAppSelector((state) => state.friends);
  const users: IUser[] = useAppSelector((state) => state.users);

  const thisUser = useContext<IUser>(UserContext)._id;

  const dispatch: AppDispatch = useAppDispatch();

  const add = (friendId: string) =>
    dispatch(
      addToFriends({
        endpoint: "/friends/add",
        friend: { initiatorId: thisUser, receiverId: friendId },
      })
    );

  useEffect(() => {
    dispatch(getUsers("/users"));
    dispatch(getFriends(`${thisUser}/friends`));
  }, []);

  return (
    <>
      <Header />
      <div className="grid gap-8">
        <Title text="Список пользователей" />
        {!users || users.length === 0 ? (
          <p className="font-bold text-center black">Нет пользователей</p>
        ) : (
          <ul className="grid gap-8">
            {users.map(
              (user: IUser) =>
                user._id != thisUser && (
                  <li className="grid gap-8 border-b-2 pb-8">
                    <p className="text-xl font-bold">
                      {user.surname} {user.name}
                    </p>
                    {friends.find(
                      (friend) =>
                        friend.initiatorId === user._id ||
                        friend.receiverId === user._id
                    ) ? (
                      <button className="button w-48 cursor-auto bg-blue-400 hover:bg-blue-400">
                        В друзьях
                      </button>
                    ) : (
                      <button
                        className="button w-48"
                        onClick={() => add(user._id)}
                      >
                        Добавить в друзья
                      </button>
                    )}
                  </li>
                )
            )}
          </ul>
        )}
      </div>
    </>
  );
});
