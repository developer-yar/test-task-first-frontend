import { MdDelete as DeleteIcon } from "react-icons/md";
import { IGoodDeed } from "./interfaces/IGoodDeed";
import { removeGoodDeed } from "./redux/thunk/removeGoodDeed";
import { useAppDispatch } from "./redux/hooks";
import { AppDispatch } from "./redux/store";

export const DeleteGoodDeed = ({
  goodDeed,
}: {
  goodDeed: IGoodDeed;
}): JSX.Element => {
  const dispatch: AppDispatch = useAppDispatch();

  const onRemove = () => {
    dispatch(removeGoodDeed(`good-deeds/remove/${goodDeed._id}`));
  };

  return (
    <DeleteIcon className="cursor-pointer" size="2rem" onClick={onRemove} />
  );
};
