import { useFormik } from "formik";
import { Input } from "../../../component/Input";
import { valiLoginEmail } from "../../../utils/rule/rule_LoginEmail";
import ItemAddOption from "../../../component/item/itemAddOption";
import { Item } from "./compornent/Item";
import { useLocation, useNavigate } from "react-router-dom";
import path from "../../../utils/path/path";
import { useCallback, useContext, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { vl1 } from "../../../utils/rule/product/rule_1";
import { error } from "console";
import { vl2 } from "../../../utils/rule/product/rule_2";
import { useMutation, useQuery } from "react-query";
import { CategreyFetch } from "../../../fetchs/categrey.fechs";
import { Categrey } from "../../../utils/types/categrey.types";
import { AppContext } from "../../../App";
import { Modal } from "../../../utils/types/modal.types";
import { Product } from "../../../utils/types/product.types";
import { Sizes } from "../../../utils/types/size.typer";
import { User } from "../../../utils/types/user.types";
import { ProductFetch } from "../../../fetchs/product.fetch";
type optionData = {
  size: string;
  price: number;
};
export default function UpdateProduct() {
  const { setIsShowMoadalOtp, setIsShowMoadal1 } = useContext(AppContext);
  const navigate = useNavigate();
  const { state } = useLocation();

  const product = state.product as Product;
  const [user, setUser] = useState<User>();
  const [fileAccept, setFileAccept] = useState<File>();
  const [file, setFile] = useState("");
  const [itemTest, setItemTest] = useState<optionData[]>([]);
  const [selectedValue, setSelectedValue] = useState(`${product.Categrey?.id}`);

  const loginMutationUpdate1 = useMutation(ProductFetch.Upadte1, {
    onSuccess: (data) => {
      // if (data.data.info.status == 1) {
      //   setIsShowMoadal1((p: Modal) => ({
      //     ...p,
      //     isHidden: true,
      //     taile: "Tài khoản của bạn chưa được xác minh!",
      //   }));
      //   return;
      // }
      setIsShowMoadal1((p: Modal) => ({
        ...p,
        isHidden: true,
        taile: "Cập nhập thành công!",
        tailebnt1: "Đóng",
        showBotton: 1,
        type: "",
      }));

      setFile("");
      setFileAccept(undefined);
      setSelectedValue("");
      formik1.resetForm();
    },
    onError: (error: any) => {
      console.log(error);
      setIsShowMoadal1((p: Modal) => ({
        ...p,
        isHidden: true,
        taile: "Cập nhập thất bại!",
        tailebnt1: "Đóng",
        showBotton: 1,
        type: "",
      }));
    },
  });
  const loginMutationUpdate2 = useMutation(ProductFetch.Upadte2, {
    onSuccess: (data) => {
      // if (data.data.info.status == 1) {
      //   setIsShowMoadal1((p: Modal) => ({
      //     ...p,
      //     isHidden: true,
      //     taile: "Tài khoản của bạn chưa được xác minh!",
      //   }));
      //   return;
      // }
      setIsShowMoadal1((p: Modal) => ({
        ...p,
        isHidden: true,
        taile: "Cập nhập thành công!",
        tailebnt1: "Đóng",
        showBotton: 1,
        type: "",
      }));

      setFile("");
      setFileAccept(undefined);
      setSelectedValue("");
      formik1.resetForm();
    },
    onError: (error: any) => {
      console.log(error);
      setIsShowMoadal1((p: Modal) => ({
        ...p,
        isHidden: true,
        taile: "Cập nhập thất bại!",
        tailebnt1: "Đóng",
        showBotton: 1,
        type: "",
      }));
    },
  });

  useEffect(() => {
    if (!product.options) return;
    setItemTest(JSON.parse(product.options));
  }, []);
  useEffect(() => {
    if (!product.image_product) return;
    const userText = localStorage.getItem("if");
    if (!userText) return;
    // setUser(JSON.parse(userText));

    const a: User = JSON.parse(userText);
    setFile(
      `http://localhost:1234/store/${a.id}/product/${product.image_product}`
    );
  }, []);
  const formik1 = useFormik({
    initialValues: {
      name_product: state && product.name_product ? product.name_product : "",
      detail: state && product.detail ? product.detail : "",
    },
    validationSchema: vl1, // Sử dụng validationSchema ở đây
    onSubmit: (values) => {
      if (!selectedValue || parseInt(selectedValue) < 0) {
        setIsShowMoadal1((p: Modal) => ({
          ...p,
          isHidden: true,
          taile: "Bạn chưa chọn loại cho sản phẩm!",
          tailebnt1: "Đóng",
          showBotton: 1,
          type: "",
        }));
        return;
      }
      if (itemTest.length < 1) {
        setIsShowMoadal1((p: Modal) => ({
          ...p,
          isHidden: true,
          taile: "Bạn chưa nhập giá với size cho sản phẩm!",
          tailebnt1: "Đóng",
          showBotton: 1,
          type: "",
        }));
        return;
      }

      if (!fileAccept && !file) {
        setIsShowMoadal1((p: Modal) => ({
          ...p,
          isHidden: true,
          taile: "Bạn chưa chọn hình cho sản phẩm!",
          tailebnt1: "Đóng",
          showBotton: 1,
          type: "",
        }));
        return;
      }
      let price = "";
      let size = "";
      itemTest.map((i) => {
        if (!price) {
          price = `${i.price}`;
          size = `"${i.size}"`;
          return;
        }
        price = `${price},${i.price}`;
        size = `${size},"${i.size}"`;
      });

      if (fileAccept) {
        const formDataToSend = new FormData();
        formDataToSend.append("id", `${product.id}`);
        formDataToSend.append("file", fileAccept);
        formDataToSend.append("size", `[${size}]`);
        formDataToSend.append("price", `[${price}]`);
        formDataToSend.append("detail", values.detail);
        formDataToSend.append("name_product", values.name_product);
        formDataToSend.append("cg_id", selectedValue);
        loginMutationUpdate2.mutate(formDataToSend);
        return;
      }
      console.log(product.cg_id, "---->", selectedValue);
      const updateData = {
        id: product.id,

        size: `[${size}]`,
        price: `[${price}]`,
        detail: values.detail,
        name_product: values.name_product,
        cg_id: selectedValue,
      };
      loginMutationUpdate1.mutate(updateData);
    },
  });
  const formik2 = useFormik({
    initialValues: {
      price: "",
      size: "",
    },
    validationSchema: vl2, // Sử dụng validationSchema ở đây
    onSubmit: (values) => {
      const data = {
        price: values.price,
        size: values.size,
      };

      handleAdd(parseInt(values.price), values.size);
      formik2.resetForm();
    },
  });
  const { data, isLoading, error } = useQuery({
    queryKey: ["categrey"],
    queryFn: () => CategreyFetch.All(),
    keepPreviousData: true,
    retry: 0,
    cacheTime: 10000,
  });

  // pick img
  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Do something with the files
    if (acceptedFiles.length > 0) {
      setFileAccept(acceptedFiles[0]);
      setFile(URL.createObjectURL(acceptedFiles[0]));
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".png", ".jpg"],
    }, // Chấp nhận tệp tin ảnh
    multiple: false, // Chỉ cho phép chọn một tệp tin duy nhất
    maxFiles: 1, // Giới hạn số lượng tệp tin được chọn thành 1
  });
  const handleRemoveItem = (index: number) => {
    const newItems = itemTest.filter((item, i) => i !== index);
    setItemTest(newItems);
  };
  const handleAdd = (price: number, size: string) => {
    const newItem = {
      price: price,
      size: size,
    };

    setItemTest([...itemTest, newItem]);
  };
  const handAddProduct = () => {
    formik1.handleSubmit();
  };
  return (
    <div className="w-full  flex flex-col bg-main-ct gap-3">
      <div>
        <ul className="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400">
          {formik1.errors.name_product && (
            <li className="flex items-center text-red-600">
              <svg
                className="w-3.5 h-3.5 mr-2 text-red-600 dark:text-green-400 flex-shrink-0"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
              {formik1.errors.name_product}
            </li>
          )}
          {formik1.errors.detail && (
            <li className="flex items-center text-red-600">
              <svg
                className="w-3.5 h-3.5 mr-2 text-red-600 dark:text-green-400 flex-shrink-0"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
              {formik1.errors.detail}
            </li>
          )}
          {formik2.errors.price && (
            <li className="flex items-center text-red-600">
              <svg
                className="w-3.5 h-3.5 mr-2 text-red-600 dark:text-green-400 flex-shrink-0"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
              {formik2.errors.price}
            </li>
          )}
          {formik2.errors.size && (
            <li className="flex items-center text-red-600">
              <svg
                className="w-3.5 h-3.5 mr-2 text-red-600 dark:text-green-400 flex-shrink-0"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
              {formik2.errors.size}
            </li>
          )}
        </ul>
      </div>
      <div className="w-full  flex  gap-3">
        <div className="w-full flex flex-col gap-3">
          <form className="bg-white w-full  rounded-md flex flex-col gap-3 ">
            <Input.Input1
              name="name_product"
              type="text"
              lable="Tên sản phẩm"
              errorMessage={formik1.errors.name_product}
              maxLength={100}
              onChange={formik1.handleChange}
              value={formik1.values.name_product}
            />
            <Input.InputArea
              name="detail"
              row={10}
              onChange={formik1.handleChange}
              errorMessage={formik1.errors.detail}
              value={formik1.values.detail}
            />
          </form>
          {itemTest.length > 0 && (
            <div className="bg-white w-1/2  rounded-md flex flex-col gap-3 py-5">
              {itemTest.map((i, index) => (
                <Item.ItemSizePrice
                  index={index}
                  price={i.price}
                  size={i.size}
                  hanleRemove={handleRemoveItem}
                />
              ))}
            </div>
          )}
          <form className="bg-white w-full  rounded-md flex flex-col gap-7 ">
            <div className="flex  gap-3 pb-3">
              <Input.Input1
                name="price"
                type="text"
                maxLength={10}
                errorMessage={formik2.errors.price}
                onChange={formik2.handleChange}
                value={formik2.values.price}
                lable="Giá"
              />
              <Input.Input1
                name="size"
                type="text"
                maxLength={10}
                errorMessage={formik2.errors.size}
                onChange={formik2.handleChange}
                lable="Size"
                value={formik2.values.size}
              />
            </div>
            <div className="flex  gap-3 pb-3">
              <div className="w-full"></div>
              <div
                className="w-full cursor-pointer h-11 bg-green-80-ct flex justify-center items-center rounded-md"
                onClick={() => formik2.handleSubmit()}
              >
                <span className="text-white">Thêm</span>
              </div>
            </div>
          </form>
        </div>

        {/* chọn ảnh */}
        <div className="w-72   flex flex-col  text-center gap-3">
          <div className="w-full rounded-md bg-white px-5 pb-5 ">
            <span>Hình</span>
            <div
              className=" w-full h-48 rounded-md border-dashed border-2 flex flex-col justify-center items-center text-gray-300"
              {...getRootProps()}
            >
              {!file && (
                <div className="flex flex-col justify-center items-center">
                  <span>Chọn hình </span>
                  <span>hoặc </span>
                  <span>kéo thả</span>
                </div>
              )}

              <input {...getInputProps()} />
              {isDragActive ? <img src={file} /> : <img src={file} />}
            </div>
          </div>

          <div className="w-full rounded-md bg-white px-5 pb-5 ">
            <div>
              <label
                htmlFor="countries"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Loại
              </label>
              <select
                id="default"
                className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={selectedValue} // Đặt giá trị được chọn từ trạng thái của bạn
                onChange={(e) => setSelectedValue(e.target.value)} // Xử lý sự kiện khi người dùng thay đổi giá trị
              >
                <option selected value={product.Categrey?.id}>
                  {product.Categrey?.cg_name}
                </option>
                {!isLoading &&
                  data.data.map((item: Categrey, index: number) => {
                    if (item.id != product.Categrey?.id) {
                      return <option value={item.id}>{item.cg_name}</option>;
                    }
                  })}
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-16  flex justify-end items-center px-5">
        <div
          className="w-28 cursor-pointer h-11 bg-gray-200 flex justify-center items-center rounded-md mr-5"
          onClick={() => navigate(path.product)}
        >
          <span className="text-black">Đóng</span>
        </div>
        <div
          className="w-60 cursor-pointer h-11 bg-blue-ct flex justify-center items-center rounded-md"
          onClick={handAddProduct}
        >
          <span className="text-white font-bold text-2xl">Thêm</span>
        </div>
      </div>
    </div>
  );
}
