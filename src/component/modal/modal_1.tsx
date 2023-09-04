import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { AppContext } from "../../App";
import { Modal } from "../../utils/types/modal.types";

export const Modal_1 = () => {
  const { setIsShowMoadalOtp, isShowMoadal1, setIsShowMoadal1, type } =
    useContext(AppContext);
  const checkType = (type: string) => {
    console.log("--->", type);
    switch (type) {
      case "VERIFY_OTP":
        setIsShowMoadalOtp(true);
        break;
    }
  };
  const handleOpen = () => {
    setIsShowMoadal1((isShowMoadal1: Modal) => ({
      ...isShowMoadal1,
      isHidden: false,
    }));
  };
  const handleOpen1 = () => {
    setIsShowMoadal1((isShowMoadal1: Modal) => ({
      ...isShowMoadal1,
      isHidden: false,
      bnt1: true,
    }));
    checkType(isShowMoadal1.type);
  };
  const handleOpen2 = () => {
    setIsShowMoadal1((isShowMoadal1: Modal) => ({
      ...isShowMoadal1,
      isHidden: false,
      bnt2: true,
    }));
    checkType(isShowMoadal1.type);
  };

  return (
    <>
      <Dialog
        open={isShowMoadal1.isHidden}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <div className="p-6 text-center">
          <svg
            className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <h3 className="mb-5 text-lg font-normal text-gray-700 dark:text-gray-400">
            {isShowMoadal1.taile}
          </h3>
          <div className=" w-full flex flex-row justify-evenly">
            {isShowMoadal1.showBotton == 0 || isShowMoadal1.showBotton == 1 ? (
              <button
                data-modal-hide="popup-modal"
                // type="button"
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center "
                onClick={handleOpen1}
              >
                {isShowMoadal1.tailebnt1}
              </button>
            ) : null}
            {isShowMoadal1.showBotton == 0 || isShowMoadal1.showBotton == 2 ? (
              <button
                data-modal-hide="popup-modal"
                // type="button"
                className="text-gray-700 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                onClick={handleOpen2}
              >
                {isShowMoadal1.tailebnt2}
              </button>
            ) : null}
          </div>
        </div>
      </Dialog>
    </>
  );
};
