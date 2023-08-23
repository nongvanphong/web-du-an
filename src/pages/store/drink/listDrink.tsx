import React from "react";
import path from "../../../utils/path/path";
import { Item } from "../../home/item";
import { ItemAdd } from "../../../component/item/ItemAdd";
import { useNavigate } from "react-router-dom";
import ItemProduct from "../../../component/item/itemProduct";

export default function ListDrink() {
  const navigate = useNavigate();
  const array = [1, 2, 3, 2, 3, 3, 3, 3, 4, 4];
  const hanleClick = () => {
    navigate(path.managerDrink);
  };
  return (
    <div className=" w-full h-full ">
      <div>
        <b>Quản lý đồ uống</b>
      </div>
      <div className="w-full h-[calc(100%-24px)]  overflow-scroll pt-3  flex gap-3">
        <div className="w-full h-full">
          <div className="grid grid-cols-4  gap-5 w-full">
            {array.map((i) => (
              <ItemProduct />
            ))}
            <div className="h-64 cursor-pointer ">
              <ItemAdd handleClick={hanleClick} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
