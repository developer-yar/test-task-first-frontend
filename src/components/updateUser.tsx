import { BiSolidEditAlt as EditIcon } from "react-icons/bi";
import { PopUp } from "./popUp";
import { IUser } from "./interfaces/IUser";
import { FormEvent, useState } from "react";
import { updateUser } from "./redux/thunk/updateUser";
import { useAppDispatch } from "./redux/hooks";

export const UpdateUser = ({ user }: { user: IUser }): JSX.Element => {
  const dispatch = useAppDispatch();

  const [updatedUser, setUpdatedUser] = useState<Partial<IUser>>(user);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onOpen = () => setIsOpen(true);

  const onSurnameChange = (e: { target: HTMLInputElement }) => {
    setUpdatedUser({
      ...updatedUser,
      surname: e.target.value,
    });
  };

  const onNameChange = (e: { target: HTMLInputElement }) => {
    setUpdatedUser({
      ...updatedUser,
      name: e.target.value,
    });
  };

  const onEmailChange = (e: { target: HTMLInputElement }) => {
    setUpdatedUser({
      ...updatedUser,
      email: e.target.value,
    });
  };

  const onPasswordChange = (e: { target: HTMLInputElement }) => {
    setUpdatedUser({
      ...updatedUser,
      password: e.target.value,
    });
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsOpen(false);

    dispatch(
      updateUser({
        endpoint: `${updatedUser._id}/users/update/`,
        user: updatedUser,
      })
    );
  };

  return (
    <>
      <div className="flex items-center gap-1">
        <EditIcon
          className="cursor-pointer"
          color="#000000"
          size="1.5rem"
          onClick={onOpen}
        />
        <p className=" bg-gray font-bold cursor-pointer" onClick={onOpen}>
          Редактировать данные
        </p>
      </div>
      <PopUp isOpen={isOpen} setIsOpen={setIsOpen}>
        <form className="flex flex-col justify-end gap-8" onSubmit={onSubmit}>
          <input
            className="input"
            type="text"
            value={updatedUser.surname}
            onChange={onSurnameChange}
            placeholder="Фамилия"
            required
            minLength={2}
            maxLength={30}
          />
          <input
            className="input"
            type="text"
            value={updatedUser.name}
            onChange={onNameChange}
            placeholder="Имя"
            required
            minLength={2}
            maxLength={30}
          />
          <input
            className="input"
            type="email"
            value={updatedUser.email}
            onChange={onEmailChange}
            placeholder="Электронная почта"
            required
            minLength={8}
            maxLength={60}
          />
          <input
            className="input"
            placeholder="Пароль"
            value={updatedUser.password}
            onChange={onPasswordChange}
            type="password"
            required
            minLength={8}
            maxLength={30}
          />
          <button className="button self-end w-32" type="submit">
            Сохранить
          </button>
        </form>
      </PopUp>
    </>
  );
};
