import { MdEdit as UpdateIcon } from "react-icons/md";
import { PopUp } from "./popUp";
import { IGoodDeed } from "./interfaces/IGoodDeed";
import { FormEvent, useState } from "react";
import { updateGoodDeed } from "./redux/thunk/updateGoodDeed";
import { useAppDispatch } from "./redux/hooks";
import { toJsonCurrentDate } from "./functions/toJsonCurrentDate";

export const UpdateGoodDeed = ({
  goodDeed,
}: {
  goodDeed: IGoodDeed;
}): JSX.Element => {
  const dispatch = useAppDispatch();

  const [updatedGoodDeed, setUpdatedGoodDeed] =
    useState<Partial<IGoodDeed>>(goodDeed);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onOpen = () => setIsOpen(true);

  const onChange = (e: { target: HTMLTextAreaElement }) => {
    setUpdatedGoodDeed({
      ...updatedGoodDeed,
      title: e.target.value,
    });
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsOpen(false);

    dispatch(
      updateGoodDeed({
        endpoint: `good-deeds/update/${updatedGoodDeed._id}`,
        goodDeed: {
          ...updatedGoodDeed,
          date: toJsonCurrentDate(),
        },
      })
    );
  };

  return (
    <>
      <UpdateIcon className="cursor-pointer" size="2rem" onClick={onOpen} />
      <PopUp isOpen={isOpen} setIsOpen={setIsOpen}>
        <form className="flex flex-col justify-end gap-8" onSubmit={onSubmit}>
          <textarea
            className="textarea"
            value={updatedGoodDeed.title}
            onChange={onChange}
            minLength={8}
            maxLength={1000}
            required
          ></textarea>
          <button className="button self-end w-32" type="submit">
            Обновить
          </button>
        </form>
      </PopUp>
    </>
  );
};
