import { FormEvent, useState } from "react";
import { IoAddCircle as CreateIcon } from "react-icons/io5";
import { PopUp } from "./popUp";
import { IUser } from "./interfaces/IUser";
import { IGoodDeed } from "./interfaces/IGoodDeed";
import { createGoodDeed } from "./redux/thunk/createGoodDeed";
import { useAppDispatch } from "./redux/hooks";
import { AppDispatch } from "./redux/store";
import { toJsonCurrentDate } from "./functions/toJsonCurrentDate";

export const CreateGoodDeed = ({ user }: { user: IUser }): JSX.Element => {
  const dispatch: AppDispatch = useAppDispatch();

  const [goodDeed, setGoodDeed] = useState<Partial<IGoodDeed>>({});
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onOpen = () => setIsOpen(true);

  const onChange = (e: { target: HTMLTextAreaElement }) => {
    setGoodDeed({
      ...goodDeed,
      title: e.target.value,
    });
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsOpen(false);

    dispatch(
      createGoodDeed({
        endpoint: `good-deeds/create`,
        goodDeed: {
          ...goodDeed,
          userId: user._id,
          date: toJsonCurrentDate(),
        },
      })
    );

    setGoodDeed({
      title: "",
    });
  };

  return (
    <>
      <CreateIcon
        className="cursor-pointer ml-auto"
        color="#2563eb"
        size="4rem"
        onClick={onOpen}
      />
      <PopUp isOpen={isOpen} setIsOpen={setIsOpen}>
        <form className="flex flex-col justify-end gap-8" onSubmit={onSubmit}>
          <textarea
            className="textarea"
            value={goodDeed.title}
            onChange={onChange}
            minLength={8}
            maxLength={1000}
            required
          ></textarea>
          <button className="button self-end w-32" type="submit">
            Создать
          </button>
        </form>
      </PopUp>
    </>
  );
};
