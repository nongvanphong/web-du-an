import { useNavigate } from "react-router-dom";
import { Product } from "../../../../utils/types/product.types";
import { useContext, useEffect, useState } from "react";
import { User } from "../../../../utils/types/user.types";
import { useMutation } from "react-query";
import { ProductFetch } from "../../../../fetchs/product.fetch";
import { Sizes } from "../../../../utils/types/size.typer";

import AddProduct from "../../Addproduct/AddProduct";
import path from "../../../../utils/path/path";
import { AppContext } from "../../../../App";
import { Modal } from "../../../../utils/types/modal.types";

type dataProduct = {
  index: number;
  product: Product;
  hanldeDelete?: (id: number) => void;
  hanldeUpdate?: (id: number, acction: number) => void;
};
type dataDelete = {
  id?: number;
  check?: boolean;
  acttion?: number;
};
export default function ItemProduct(props: dataProduct) {
  const navigate = useNavigate();
  const { isShowMoadal1, setIsShowMoadal1 } = useContext(AppContext);
  const [user, setUser] = useState<User>();
  const [options, setSetOptions] = useState<Sizes[]>();
  const [acction, setAcction] = useState<number>(props.product.status);
  const [isCheck, setIsCheck] = useState<dataDelete>({
    acttion: 0,
    check: false,
    id: -1,
  });

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
  const loginMutationDelete = useMutation(ProductFetch.Delete, {
    onSuccess: (data) => {
      // console.log("thành công");
      if (!props.hanldeDelete) return;
      console.log(props.product.id);
      props.hanldeDelete(props.product.id);
    },
    onError: (error: any) => {
      console.log("thất bại====> ", error);

      if (error.response.data.msg) {
        setIsShowMoadal1((p: Modal) => ({
          ...p,
          isHidden: true,
          taile: `Xóa đang có lỗi. Vui lòng thử lại sau!`,
          tailebnt1: "Đóng",
          showBotton: 1,
        }));
        return;
      }
    },
  });

  const handleAcction = () => {
    if (acction == 0) {
      setAcction(1);
      // if (!props.hanldeUpdate) return;
      // props.hanldeUpdate(props.product.id, 1);
      const dataUpdate = {
        id: props.product.id,
        acction: 1,
      };
      loginMutation.mutate(dataUpdate);

      return;
    }
    setAcction(0);
    // if (!props.hanldeUpdate) return;
    // props.hanldeUpdate(props.product.id, 1);
    const dataUpdate = {
      id: props.product.id,
      acction: 0,
    };
    loginMutation.mutate(dataUpdate);
    return;
  };
  const hanldeEdit = () => {
    navigate(path.updateProduct, { state: { product: props.product } });
  };
  const hanldeDelete = () => {
    setIsShowMoadal1((p: Modal) => ({
      ...p,
      isHidden: true,
      taile: `Bạn có muốn xóa sản phẩm "${props.product.name_product}" này không?`,
      tailebnt1: "Đóng",
      showBotton: 0,
      tailebnt2: "Xóa",
      bnt2: false,
    }));
    // console.log(props.product.id, "=>", props.product.status);
    setIsCheck({
      acttion: props.product.status,
      check: true,
      id: props.product.id,
    });

    // if (!props.hanldeDelete) return;
    // props.hanldeDelete(props.product.id);
    // handleAcction();
    // loginMutationDelete.mutate({ id: props.product.id });
  };

  useEffect(() => {
    if (isCheck.id != -1 && isCheck.check && isShowMoadal1.bnt2) {
      setIsCheck({ check: false });

      loginMutationDelete.mutate({ id: props.product.id });
      return;
    }
  }, [isShowMoadal1.bnt2]);
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
            <span className="font-medium">
              {props.product.Categrey?.cg_name}
            </span>
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
              <div className="font-bold">{i.price}</div>
            ))}
        </div>
      </td>
      <td className="py-3 px-6 text-center">
        {options &&
          options.map((i: Sizes) => <div className="font-bold">{i.size}</div>)}
      </td>
      <td className="py-3 px-6 text-center">
        <span
          className={`${
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
