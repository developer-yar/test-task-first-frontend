import React, { Dispatch, SetStateAction } from "react";
import { GrClose } from "react-icons/gr";
import classNames from "classnames";

export const PopUp = ({
  children,
  isOpen,
  setIsOpen,
}: {
  children: JSX.Element;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}): JSX.Element => (
  <>
    <div
      className={classNames(
        `fixed inset-0 w-screen md:h-screen bg-blue-100/90 
        flex md:items-center justify-center transition-opacity duration-350
        pointer-events-none opacity-0`,
        {
          "pointer-events-auto opacity-100": isOpen,
        }
      )}
    >
      <div
        className={classNames(
          `flex flex-col justify-end gap-8 bg-white rounded-xl 
            transition duration-700 min-w-[320px] md:min-w-[560px] p-8 scale-[0.5]`,
          {
            "scale-[1]": isOpen,
          }
        )}
      >
        <GrClose
          className="self-end cursor-pointer"
          size="32"
          onClick={() => {
            setIsOpen(false);
          }}
        />

        {children}
      </div>
    </div>
  </>
);
