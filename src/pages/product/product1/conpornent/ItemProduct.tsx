import { useNavigate } from "react-router-dom";
import { Product } from "../../../../utils/types/product.types";
import { useEffect, useState } from "react";
import { User } from "../../../../utils/types/user.types";
import { useMutation } from "react-query";
import { ProductFetch } from "../../../../fetchs/product.fetch";
import { Sizes } from "../../../../utils/types/size.typer";

import AddProduct from "../../Addproduct/AddProduct";
import path from "../../../../utils/path/path";

type dataProduct = {
  index: number;
  product: Product;
  hanldeDelete?: (id: number) => void;
};

export default function ItemProduct(props: dataProduct) {
  const navigate = useNavigate();

  const [user, setUser] = useState<User>();
  const [options, setSetOptions] = useState<Sizes[]>();
  const [acction, setAcction] = useState<number>(props.product.status);
  useEffect(() => {
    const userText = localStorage.getItem("if");
    if (!userText) return;
    setUser(JSON.parse(userText));
  }, []);
  useEffect(() => {
    if (!props.product.options) return;
    // console.log(JSON.parse(props.product.options));
    setSetOptions(JSON.parse(props.product.options));
  }, []);
  const loginMutation = useMutation(ProductFetch.Acction, {
    onSuccess: (data) => {
      console.log("thành công");
    },
    onError: (error: any) => {
      console.log("thất bại====> ", error);
    },
  });
  const handleAcction = () => {
    if (acction == 0) {
      setAcction(1);
      const dataUpdate = {
        id: props.product.id,
        acction: 1,
      };
      loginMutation.mutate(dataUpdate);

      return;
    }
    setAcction(0);
    const dataUpdate = {
      id: props.product.id,
      acction: 0,
    };
    loginMutation.mutate(dataUpdate);
    return;
  };
  const hanldeEdit = () => {
    navigate(path.AddProduct, { state: { test: "1" } });
  };
  const hanldeDelete = () => {
    if (!props.hanldeDelete) return;
    props.hanldeDelete(props.product.id);
  };
  return (
    <tr className="border-b border-gray-200 hover:bg-yellow-50">
      <td className="py-3 px-6 text-left whitespace-nowrap">
        <div>{props.index + 1}</div>
      </td>
      <td className="py-3 px-6 text-left whitespace-nowrap">
        <div className="flex items-center">
          <div className="mr-2">
            <img
              className="w-10 h-10 rounded-full border-gray-200 border transform hover:scale-125"
              src={`http://localhost:1234/store/${user?.id}/product/${props.product.image_product}`}
            />
          </div>
        </div>
      </td>
      <td className="py-3 px-6 text-left">
        <div className="flex items-center">
          <div className="mr-2">
            <span className="font-medium">{props.product.name_product}</span>
          </div>
        </div>
      </td>
      <td className="py-3 px-6 text-center">
        <div className="flex flex-col items-center justify-center">
          {options &&
            options.map((i: Sizes) => (
              <div className="font-bold">{i.pr_price}</div>
            ))}
        </div>
      </td>
      <td className="py-3 px-6 text-center">
        {options &&
          options.map((i: Sizes) => (
            <div className="font-bold">{i.pr_size}</div>
          ))}
      </td>
      <td className="py-3 px-6 text-center">
        <span
          className={`  ${
            acction == 0
              ? "bg-purple-200 text-purple-600"
              : "bg-orange-200 text-orange-600"
          } py-1 px-3 rounded-full text-xs cursor-pointer`}
          onClick={handleAcction}
        >
          {acction == 0 ? "Còn hàng" : "Hết hàng"}
        </span>
      </td>
      <td className="py-3 px-6 text-center">
        <div className="flex item-center justify-center">
          <div
            className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110 cursor-pointer "
            onClick={hanldeEdit}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </div>
          <div
            className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
            onClick={hanldeDelete}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </div>
        </div>
      </td>
    </tr>
  );
}
