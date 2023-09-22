import { useContext, useEffect, useState } from "react";
import { Store } from "../../../utils/types/store.types";
import { User } from "../../../utils/types/user.types";
import path from "../../../utils/path/path";
import { AppContext } from "../../../App";
import { format } from "date-fns";
import { BillDetail } from "../../../utils/types/billdetail.types";

type data = {
  index: number;
  id: number;
  user_id: number;
  activeItemIndex: number;
  handleAcctive: (
    acctive: number,
    id: number,
    user_id: number,
    img?: string,
    phone?: string,
    address?: string,
    user_name?: string,
    product?: BillDetail
  ) => void;
  user_name?: string;
  img?: string;
  address?: string;
  total_amount?: number | string;
  phone?: string;
  createdAt: string;
  product: BillDetail;
};
export const Item = (props: data) => {
  const handleAcctive = () => {
    props.handleAcctive(
      props.index,
      props.id,
      props.user_id,
      props.img,
      props.phone,
      props.address,
      props.user_name,
      props.product
    );
  };
  const isActive = props.index === props.activeItemIndex;
  return (
    <tr
      className={`border-b border-gray-200 hover:bg-yellow-300 cursor-pointer transform  hover:scale-y-110 hover:shadow-md ${
        isActive ? "bg-yellow-300 scale-y-110 shadow-md" : ""
      }`}
      onClick={handleAcctive}
    >
      <td className="py-3 px-6 text-left whitespace-nowrap">
        <div>{props.index + 1}</div>
      </td>

      <td className="py-3 px-6 text-left">
        <div className="flex items-center">
          <div className="mr-2">
            <span className="font-medium ">{props.user_name}</span>
          </div>
        </div>
      </td>
      <td className="py-3 px-6 text-left">
        <div className="flex items-center">
          <div className="mr-2">
            <span className="font-medium">{props.total_amount}</span>
          </div>
        </div>
      </td>
      <td className="py-3 px-6 text-left">
        <div className="flex items-center">
          <div className="mr-2">
            <span className="font-medium">{props.phone}</span>
          </div>
        </div>
      </td>
      <td className="py-3 px-6 text-left">
        <div className="flex items-center">
          <div className="mr-2">
            <span className="font-medium">
              {format(new Date(props.createdAt), "yyyy-MM-dd HH:mm:ss")}
            </span>
          </div>
        </div>
      </td>

      <td className="py-3 px-6 text-center">
        <div className="flex item-center justify-center gap-5">
          <div className="bg-red-500 rounded-md px-5 py-1 text-white transform  hover:scale-110 cursor-pointer ">
            Hủy
          </div>
          <div className="cursor-pointer bg-green-80-ct rounded-md px-5 py-1 text-white transform  hover:scale-110">
            Xác nhận
          </div>
        </div>
      </td>
    </tr>
  );
};
