import { useDropzone } from "react-dropzone";

import { ItemAdd, ItemShow } from "../../../component/item/ItemAdd";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import ItemAddOption from "../../../component/item/itemAddOption";
import { useLocation } from "react-router-dom";
import { useFormik } from "formik";
import { vlDrink } from "../../../utils/rule/rule_Drink";
import { error } from "console";
import { vlOption } from "../../../utils/rule/rule_Option";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { CategreyFetch } from "../../../fetchs/categrey.fechs";
import { Categrey } from "../../../utils/types/categrey.types";
import { AppContext } from "../../../App";
import { Modal } from "../../../utils/types/modal.types";
import { ProductFetch } from "../../../fetchs/product.fetch";

type optionData = {
  size: string;
  price: number;
};

export default function Drink() {
  const { setIsShowMoadalOtp, setIsShowMoadal1 } = useContext(AppContext);
  const { state } = useLocation();
  const queryClient = useQueryClient();
  const [itemTest, setItemTest] = useState<optionData[]>([]);

  const [file, setFile] = useState("");
  const [fileAccept, setFileAccept] = useState<File>();
  const [selectedValue, setSelectedValue] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["categrey"],
    queryFn: () => CategreyFetch.All(),
    keepPreviousData: true,
    retry: 0,
    cacheTime: 10000,
  });

  useEffect(() => {
    if (!data) return;

    setSelectedValue(data.data[0].id);
  }, [data]);
  const loginMutation = useMutation(ProductFetch.Create, {
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
        taile: "Thành công!",
        tailebnt1: "Đóng",
        showBotton: 1,
        type: "",
      }));
    },
    onError: (error: any) => {
      setIsShowMoadal1((p: Modal) => ({
        ...p,
        isHidden: true,
        taile: "Thất bại!",
        tailebnt1: "Đóng",
        showBotton: 1,
        type: "",
      }));
    },
  });
  const formik = useFormik({
    initialValues: {
      name_product: "",
      detail: "",
    },
    validationSchema: vlDrink, // Sử dụng validationSchema ở đây
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
      if (!fileAccept) {
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

      const formDataToSend = new FormData();
      formDataToSend.append("file", fileAccept);
      formDataToSend.append("pr_size", `[${size}]`);
      formDataToSend.append("pr_price", `[${price}]`);
      formDataToSend.append("detail", values.detail);
      formDataToSend.append("name_product", values.name_product);
      formDataToSend.append("cg_id", selectedValue);
      loginMutation.mutate(formDataToSend);
    },
  });
  const formik1 = useFormik({
    initialValues: {
      price: "",
      size: "",
    },
    validationSchema: vlOption, // Sử dụng validationSchema ở đây
    onSubmit: (values) => {
      handleAdd(parseInt(values.price), values.size);
    },
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
  return (
    <div className=" w-full h-full ">
      <div>
        <b>Quản lý đồ uống</b>
      </div>
      <div className="w-full h-[calc(100%-24px)]  overflow-scroll pt-3  flex gap-3">
        <div className="w-full h-full">
          <div className="w-full h-64  flex justify-between">
            <div className="w-56 h-full " {...getRootProps()}>
              <input {...getInputProps()} />
              {isDragActive ? (
                <ItemShow file={file} />
              ) : (
                <ItemShow file={file} />
              )}
            </div>
            <div className="pl-5 w-3/4">
              <form onSubmit={formik.handleSubmit} className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Phân loại
                </label>

                <select
                  id="default"
                  className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={selectedValue} // Đặt giá trị được chọn từ trạng thái của bạn
                  onChange={(e) => setSelectedValue(e.target.value)} // Xử lý sự kiện khi người dùng thay đổi giá trị
                >
                  {!isLoading &&
                    data.data.map((item: Categrey, index: number) => (
                      <option value={item.id}>{item.cg_name}</option>
                    ))}
                </select>

                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Tên đồ uống
                </label>
                <input
                  className={`shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline `}
                  name="name_product"
                  maxLength={30}
                  type="text"
                  placeholder="Trà sữa"
                  onChange={formik.handleChange}
                  value={formik.values.name_product}
                />
                <div className="w-full flex justify-end py-1">
                  <span className="text-red-500 text-xs italic">
                    {formik.errors.name_product}
                  </span>
                </div>

                <div className=" flex flex-col gap-1">
                  {itemTest.map((i, index) => (
                    <ItemAddOption
                      price={i.price}
                      size={i.size}
                      index={index}
                      hanleRemove={handleRemoveItem}
                    />
                  ))}
                </div>
              </form>
              <form
                onSubmit={formik1.handleSubmit}
                className="w-full flex gap-5 items-end"
              >
                <div className="mb-4 mt-5">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="username"
                  >
                    Size
                  </label>
                  <input
                    className={`shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline `}
                    name="size"
                    onChange={formik1.handleChange}
                    value={formik1.values.size}
                    maxLength={20}
                    type="text"
                    placeholder="Size X,M,L..."
                  />
                </div>
                <div className="mb-4 mt-5">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="username"
                  >
                    Giá
                  </label>

                  <input
                    className={`shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline `}
                    name="price"
                    onChange={formik1.handleChange}
                    value={formik1.values.price}
                    maxLength={20}
                    type="number"
                    placeholder="20.000 vnđ"
                  />
                </div>
                <div className="mb-4 mt-5 ">
                  <button
                    className={`shadow appearance-none border rounded w-full py-3 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-green-80-ct  cursor-pointer`}
                    //onClick={() => handleAdd()}
                    type="submit"
                  >
                    <b className=" text-white"> Thêm</b>
                  </button>
                </div>
              </form>
              <div className="w-full flex justify-end py-1">
                <span className="text-red-500 text-xs italic">
                  {formik1.errors.size}
                </span>
              </div>
              <div className="w-full flex justify-end py-1">
                <span className="text-red-500 text-xs italic">
                  {formik1.errors.price}
                </span>
              </div>
              <form onSubmit={formik.handleChange} className="w-full h-full">
                <div>
                  <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                    <div className="flex items-center justify-between px-3 py-2 border-b dark:border-gray-600">
                      <div className="flex flex-wrap items-center divide-gray-200 sm:divide-x dark:divide-gray-600">
                        <div className="flex items-center space-x-1 sm:pr-4">
                          <button
                            type="button"
                            className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                          >
                            <svg
                              className="w-4 h-4"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 12 20"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M1 6v8a5 5 0 1 0 10 0V4.5a3.5 3.5 0 1 0-7 0V13a2 2 0 0 0 4 0V6"
                              />
                            </svg>
                            <span className="sr-only">Attach file</span>
                          </button>
                          <button
                            type="button"
                            className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                          >
                            <svg
                              className="w-4 h-4"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 16 20"
                            >
                              <path d="M8 0a7.992 7.992 0 0 0-6.583 12.535 1 1 0 0 0 .12.183l.12.146c.112.145.227.285.326.4l5.245 6.374a1 1 0 0 0 1.545-.003l5.092-6.205c.206-.222.4-.455.578-.7l.127-.155a.934.934 0 0 0 .122-.192A8.001 8.001 0 0 0 8 0Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                            </svg>
                            <span className="sr-only">Embed map</span>
                          </button>
                          <button
                            type="button"
                            className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                          >
                            <svg
                              className="w-4 h-4"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 16 20"
                            >
                              <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                              <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                            </svg>
                            <span className="sr-only">Upload image</span>
                          </button>
                          <button
                            type="button"
                            className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                          >
                            <svg
                              className="w-4 h-4"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 16 20"
                            >
                              <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z" />
                              <path d="M14.067 0H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.933-2ZM6.709 13.809a1 1 0 1 1-1.418 1.409l-2-2.013a1 1 0 0 1 0-1.412l2-2a1 1 0 0 1 1.414 1.414L5.412 12.5l1.297 1.309Zm6-.6-2 2.013a1 1 0 1 1-1.418-1.409l1.3-1.307-1.295-1.295a1 1 0 0 1 1.414-1.414l2 2a1 1 0 0 1-.001 1.408v.004Z" />
                            </svg>
                            <span className="sr-only">Format code</span>
                          </button>
                          <button
                            type="button"
                            className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                          >
                            <svg
                              className="w-4 h-4"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM13.5 6a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm-7 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm3.5 9.5A5.5 5.5 0 0 1 4.6 11h10.81A5.5 5.5 0 0 1 10 15.5Z" />
                            </svg>
                            <span className="sr-only">Add emoji</span>
                          </button>
                        </div>
                        <div className="flex flex-wrap items-center space-x-1 sm:pl-4">
                          <button
                            type="button"
                            className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                          >
                            <svg
                              className="w-4 h-4"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 21 18"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9.5 3h9.563M9.5 9h9.563M9.5 15h9.563M1.5 13a2 2 0 1 1 3.321 1.5L1.5 17h5m-5-15 2-1v6m-2 0h4"
                              />
                            </svg>
                            <span className="sr-only">Add list</span>
                          </button>
                          <button
                            type="button"
                            className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                          >
                            <svg
                              className="w-4 h-4"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M18 7.5h-.423l-.452-1.09.3-.3a1.5 1.5 0 0 0 0-2.121L16.01 2.575a1.5 1.5 0 0 0-2.121 0l-.3.3-1.089-.452V2A1.5 1.5 0 0 0 11 .5H9A1.5 1.5 0 0 0 7.5 2v.423l-1.09.452-.3-.3a1.5 1.5 0 0 0-2.121 0L2.576 3.99a1.5 1.5 0 0 0 0 2.121l.3.3L2.423 7.5H2A1.5 1.5 0 0 0 .5 9v2A1.5 1.5 0 0 0 2 12.5h.423l.452 1.09-.3.3a1.5 1.5 0 0 0 0 2.121l1.415 1.413a1.5 1.5 0 0 0 2.121 0l.3-.3 1.09.452V18A1.5 1.5 0 0 0 9 19.5h2a1.5 1.5 0 0 0 1.5-1.5v-.423l1.09-.452.3.3a1.5 1.5 0 0 0 2.121 0l1.415-1.414a1.5 1.5 0 0 0 0-2.121l-.3-.3.452-1.09H18a1.5 1.5 0 0 0 1.5-1.5V9A1.5 1.5 0 0 0 18 7.5Zm-8 6a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7Z" />
                            </svg>
                            <span className="sr-only">Settings</span>
                          </button>
                          <button
                            type="button"
                            className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                          >
                            <svg
                              className="w-4 h-4"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M18 2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2ZM2 18V7h6.7l.4-.409A4.309 4.309 0 0 1 15.753 7H18v11H2Z" />
                              <path d="M8.139 10.411 5.289 13.3A1 1 0 0 0 5 14v2a1 1 0 0 0 1 1h2a1 1 0 0 0 .7-.288l2.886-2.851-3.447-3.45ZM14 8a2.463 2.463 0 0 0-3.484 0l-.971.983 3.468 3.468.987-.971A2.463 2.463 0 0 0 14 8Z" />
                            </svg>
                            <span className="sr-only">Timeline</span>
                          </button>
                          <button
                            type="button"
                            className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                          >
                            <svg
                              className="w-4 h-4"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z" />
                              <path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
                            </svg>
                            <span className="sr-only">Download</span>
                          </button>
                        </div>
                      </div>
                      <button
                        type="button"
                        data-tooltip-target="tooltip-fullscreen"
                        className="p-2 text-gray-500 rounded cursor-pointer sm:ml-auto hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                      >
                        <svg
                          className="w-4 h-4"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 19 19"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 1h5m0 0v5m0-5-5 5M1.979 6V1H7m0 16.042H1.979V12M18 12v5.042h-5M13 12l5 5M2 1l5 5m0 6-5 5"
                          />
                        </svg>
                        <span className="sr-only">Full screen</span>
                      </button>
                      <div
                        id="tooltip-fullscreen"
                        role="tooltip"
                        className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
                      >
                        Show full screen
                        <div className="tooltip-arrow" data-popper-arrow />
                      </div>
                    </div>
                    <div className="px-4 py-2 bg-white rounded-b-lg dark:bg-gray-800">
                      <label htmlFor="editor" className="sr-only">
                        Publish post
                      </label>
                      <textarea
                        id="editor"
                        rows={7}
                        className="block w-full px-0 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                        placeholder="Hãy mô tả về cửa hàng của bạn..."
                        required
                        defaultValue={"detail"}
                        name="detail"
                        onChange={formik.handleChange}
                        value={formik.values.detail}
                      />
                      <div className="w-full flex justify-end py-1">
                        <span className="text-red-500 text-xs italic">
                          {formik.errors.detail}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
              {state ? (
                <div className="w-full flex justify-center items-center flex-col gap-3">
                  <div className="px-40 py-2 bg-orage-100-ct text-center text-white  text-lg rounded-md cursor-pointer">
                    <b>Sửa</b>
                  </div>
                  {/* <div className="px-40 py-2 bg-red-600 text-center text-white  text-lg rounded-md cursor-pointer">
                    <b>Xóa</b>
                  </div> */}
                </div>
              ) : (
                <div className="w-full flex justify-center items-center flex-col gap-3">
                  <div
                    className="px-40 py-2 bg-green-80-ct text-center text-white  text-lg rounded-md cursor-pointer"
                    onClick={() => formik.handleSubmit()}
                  >
                    <b>Thêm</b>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
