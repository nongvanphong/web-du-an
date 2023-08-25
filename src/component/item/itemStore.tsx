import { useContext } from "react";
import trasua from "../../assets/image/ts.png";
import { Store } from "../../utils/types/store.types";
import { AppContext } from "../../App";
import path from "../../utils/path/path";

type data = {
  index: number;
  store: Store;
};
export default function ItemStore(props: data) {
  const appContext = useContext(AppContext);
  const hanldeClick = () => {
    console.log(props.store.status);
    if (props.store.status == 0) {
      window.location.href = path.store;
      return;
    }
    if (props.store.status == 1) {
      appContext.setIsHidden(
        true,
        "Cửa hàng của bạn chưa được kích hoạt!",
        "Đóng"
      );
      return;
    }
    if (props.store.status == 2) {
      appContext.setIsHidden(true, "Cửa hàng của bạn đã bị khóa!", "Đóng");
      return;
    }
  };
  return (
    <tr
      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
      onClick={hanldeClick}
    >
      <td className="w-4 p-4">{props.index}</td>
      <th
        scope="row"
        className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
      >
        <img className="w-10 h-10 rounded-full" src={trasua} alt="Jese image" />
        <div className="pl-3">
          <div className="text-base font-semibold">
            {props.store.name_store}
          </div>
          <div className="font-normal text-gray-500">
            {props.store.phone_store}
          </div>
        </div>
      </th>
      <td className="px-6 py-4">{props.store.address_store}</td>
      <td className="px-6 py-4">
        <div className="flex items-center">
          <div
            className={`h-2.5 w-2.5 rounded-full ${
              props.store.status == 0
                ? `bg-green-500`
                : props.store.status == 1
                ? `bg-orange-500`
                : `bg-red-500`
            } mr-2`}
          ></div>
          {props.store.status == 0
            ? `Hoạt động`
            : props.store.status == 1
            ? `Chưa kích hoạt`
            : `Đã khóa`}
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="font-medium text-blue-600 dark:text-blue-500">
          {props.store.time_open ? props.store.time_open : "Chưa mở"}
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="font-medium text-blue-600 dark:text-blue-500 ">
          {props.store.time_close}
        </div>
      </td>
      <td className="px-6 py-4">
        <div
          className={`${
            props.store.time_open ? "bg-red-600" : "bg-green-80-ct"
          } rounded-lg w-fit font-medium  text-center px-3 py-2 cursor-pointer text-white`}
        >
          {props.store.time_open ? "Đóng cửa" : "Mở cửa"}
        </div>
      </td>
    </tr>
  );
}
