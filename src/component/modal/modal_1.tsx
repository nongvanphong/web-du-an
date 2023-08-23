import { useContext, useState } from "react";
import { AppContext } from "../../App";

type Modal_1Type = {
  isHidden: boolean;
  taile: string;
  bnt1: string;
};

export const Modal_1 = (props: Modal_1Type) => {
  const appContext = useContext(AppContext);
  return (
    <div>
      <div
        id="popup-modal"
        tabIndex={-1}
        style={{
          backgroundColor: "rgba(128, 128, 128, 0.5) ",
          display: props.isHidden ? "flex" : "none",
        }}
        className="  fixed z-50 left-0 right-0 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%)] max-h-full  justify-center items-center "
        // onClick={() => {
        //   appContext.setIsHidden(false, "", "", "");
        // }}
      >
        <div className="relative w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            {/* <button
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="false"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button> */}
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
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                {props.taile}
              </h3>
              <button
                data-modal-hide="popup-modal"
                type="button"
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                onClick={() => {
                  //setIsHidden(false);
                  appContext.setIsHidden(false, "", "", "");
                }}
              >
                {props.bnt1}
              </button>
              {/* <button
                data-modal-hide="popup-modal"
                type="button"
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                onClick={() => {
                  setIsHidden(false);
                }}
              >
                {props.bnt2}
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
