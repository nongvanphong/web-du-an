import { useContext, useEffect, useState } from "react";
import { Store } from "../../utils/types/store.types";
import { User } from "../../utils/types/user.types";
import path from "../../utils/path/path";
import { AppContext } from "../../App";

type data = {
  store: Store;
};
export const Item = (props: data) => {
  const appContext = useContext(AppContext);
  const hanldeClick = () => {
    console.log(props.store.status);
    if (props.store.status == 0) {
      window.location.href = path.store;
      return;
    }
    // if (props.store.status == 1) {
    //   appContext.setIsHidden(
    //     true,
    //     "Cửa hàng của bạn chưa được kích hoạt!",
    //     "Đóng"
    //   );
    //   return;
    // }
    // if (props.store.status == 2) {
    //   appContext.setIsHidden(true, "Cửa hàng của bạn đã bị khóa!", "Đóng");
    //   return;
    // }
  };
  return (
    <div
      className="h-64 bg-orage-100-ct rounded-3xl p-5 cursor-pointer"
      onClick={hanldeClick}
    >
      <div className="text-4xl text-white">
        Tên quán : <span className="font-bold">{props.store.name_store}</span>
      </div>
      <div className="text-2xl text-white">
        Hoạt động :{" "}
        <span className=" text-green-700 font-bold">
          {props.store.time_open ? props.store.time_open : "Chưa mở"}
        </span>{" "}
        -{" "}
        <span className=" text-red-700 font-bold">
          {props.store.time_close ? props.store.time_close : "24:00"}
        </span>
      </div>
      <div className="text-2xl text-white">
        Liên hệ : {props.store.phone_store}
      </div>
      <div className="text-2xl text-white">
        Tình trạng:{" "}
        <span
          className={`${
            props.store.status == 0
              ? `text-green-700`
              : props.store.status == 1
              ? `text-blue-300`
              : `text-red-500`
          }  font-bold`}
        >
          {props.store.status == 0
            ? `Đã kích hoạt`
            : props.store.status == 1
            ? `Chưa kích hoạt`
            : `Đã khóa`}
        </span>
      </div>
    </div>
  );
};
