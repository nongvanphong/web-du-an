import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";

import { ItemAdd, ItemShow } from "../../../component/item/ItemAdd";
import { useCallback, useContext, useEffect, useState } from "react";
import path from "../../../utils/path/path";
import { User } from "../../../utils/types/user.types";
import { useFormik } from "formik";
import { valiRegister } from "../../../utils/rule/rule_register";
import { useMutation, useQueryClient } from "react-query";

import { AppContext } from "../../../App";
import ModalOtp from "../../../component/modal/modalOtp";
import { authFetch } from "../../../fetchs/auth/authFetch";
import { Modal } from "../../../utils/types/modal.types";

export default function Resgister() {
  const [file, setFile] = useState("");
  const [user, setUser] = useState<User>();
  const { setIsShowMoadalOtp, setIsShowMoadal1 } = useContext(AppContext);
  useEffect(() => {
    const data = localStorage.getItem("if");
    if (data) {
      setUser(JSON.parse(data.toString()));
    }
  }, []);

  const navigate = useNavigate();

  const fetchCoordinates = async () => {
    let lat_store = -11111;
    let long_store = -11111;

    if (navigator.geolocation) {
      try {
        const position = await new Promise<GeolocationPosition>(
          (resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                resolve(position);
              },
              (error) => {
                reject(error);
              }
            );
          }
        );

        lat_store = position.coords.latitude;
        long_store = position.coords.longitude;
      } catch (error) {
        console.error("Error getting location:", error);
      }
    } else {
      console.error("Geolocation is not supported by this browser.");
    }

    return { lat_store, long_store };
  };
  const loginMutation = useMutation(authFetch.Register, {
    onSuccess: (data) => {
      // Xử lý kết quả ở đây, ví dụ lưu thông tin đăng nhập vào trạng thái hoặc local storage
      // Làm mới dữ liệu sau khi đăng nhập thành công
      //window.location.reload();
      setIsShowMoadalOtp(true);
    },
    onError: (error: any) => {
      if (error.response.status === 400) {
        setIsShowMoadal1((p: Modal) => ({
          ...p,
          isHidden: true,
          taile: "Đăng kí thất bại! Vui lòng thử lại!",
          tailebnt1: "Đóng",
          showBotton: 1,
        }));
        return;
      }
      if (error.response.status === 409) {
        //appContext.setIsHidden(true, "Đăng kí thất bại!", "Đóng");
        setIsShowMoadal1((p: Modal) => ({
          ...p,
          isHidden: true,
          taile: "Gmail và số điện thoại cửa hàng đã được sử dụng!",
          tailebnt1: "Đóng",
          showBotton: 1,
        }));
        return;
      }
    },
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      store_phone_number: "",
      store_name: "",
      manager_phone_number: "",
      address: "",
      password: "",
      describe: "",
      confirmPassword: "",
    },
    validationSchema: valiRegister, // Sử dụng validationSchema ở đây
    onSubmit: async (values) => {
      const { lat_store, long_store } = await fetchCoordinates();

      if (long_store == -11111 && lat_store == -11111) {
        return console.log("lỗi không lấy được tọa độ");
      }

      const data = {
        email: values.email,
        manager_phone_number: values.manager_phone_number,
        store_phone_number: values.store_phone_number,
        address: values.address,
        describe: values.describe,
        store_name: values.store_name,
        password: values.password,
        lat: lat_store,
        long: long_store,
      };

      loginMutation.mutate(data);
    },
  });

  // pick img
  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Do something with the files
    if (acceptedFiles.length > 0) {
      console.log("=>", acceptedFiles[0]);
      // setfile(acceptedFiles[0]);
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

  return (
    <div className="w-full h-full overflow-hidden  bg-gray-ct">
      <div className="w-full h-full overflow-hidden p-5">
        <div>
          <b className="text-xl">Đăng kí dịch vụ</b>
        </div>
        <div className="w-full  flex gap-5 justify-end">
          <button
            className="px-5 py-3 bg-green-80-ct rounded-2xl text-white cursor-pointer"
            type="button" // Để tránh hành vi mặc định của nút submit trong form
            onClick={() => formik.handleSubmit()}
          >
            <b>Đăng kí</b>
          </button>
          <div
            className="px-5 py-3 bg-red-80-ct rounded-2xl text-white cursor-pointer"
            onClick={() => navigate(path.login)}
          >
            <b>Hủy</b>
          </div>
        </div>
        <form
          className="w-full  h-[calc(100%-60px)]  overflow-scroll pt-3  flex gap-3"
          onSubmit={formik.handleSubmit}
        >
          <div className="w-full h-full">
            <div className="w-full   flex justify-between">
              <div className="w-56 h-64 " {...getRootProps()}>
                <input {...getInputProps()} />
                {isDragActive ? (
                  <ItemShow file={file} />
                ) : (
                  <ItemShow file={file} />
                )}
              </div>
              <div className="pl-5 w-3/4">
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="username"
                  >
                    Nhập email cửa hàng
                  </label>
                  <input
                    className={`shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline `}
                    type="email"
                    placeholder="Email"
                    name="email"
                    maxLength={50}
                    onChange={formik.handleChange}
                    value={formik.values.email}
                  />
                  <div className="w-full flex justify-end py-1">
                    <span className="text-red-500 text-xs italic">
                      {formik.errors.email}
                    </span>
                  </div>
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="username"
                  >
                    Nhập tên cửa hàng
                  </label>
                  <input
                    className={`shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline `}
                    type="text"
                    placeholder="Tên cửa hàng"
                    name="store_name"
                    maxLength={100}
                    onChange={formik.handleChange}
                    value={formik.values.store_name}
                  />
                  <div className="w-full flex justify-end py-1">
                    <span className="text-red-500 text-xs italic">
                      {formik.errors.store_name}
                    </span>
                  </div>
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="username"
                  >
                    Nhập số điện thoại cửa hàng
                  </label>
                  <input
                    className={`shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline `}
                    type="text"
                    placeholder="số điện thoại"
                    name="store_phone_number"
                    maxLength={10}
                    onChange={formik.handleChange}
                    value={formik.values.store_phone_number}
                  />
                  <div className="w-full flex justify-end py-1">
                    <span className="text-red-500 text-xs italic">
                      {formik.errors.store_phone_number}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-4 mt-5">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Số điện thoại chủ cửa hàng
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline `}
                name="manager_phone_number"
                maxLength={10}
                type="text"
                placeholder="Số điện thoại"
                onChange={formik.handleChange}
                value={formik.values.manager_phone_number}
              />
              <div className="w-full flex justify-end py-1">
                <span className="text-red-500 text-xs italic">
                  {formik.errors.manager_phone_number}
                </span>
              </div>
            </div>
            <div className="mb-4 mt-5">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Địa chỉ cửa hàng
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline `}
                name="address"
                maxLength={150}
                type="text"
                placeholder="Địa chỉ"
                onChange={formik.handleChange}
                value={formik.values.address}
              />
              <div className="w-full flex justify-end py-1">
                <span className="text-red-500 text-xs italic">
                  {formik.errors.address}
                </span>
              </div>
            </div>
            <div className="mb-4 mt-5">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Nhập mật khẩu
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline `}
                name="password"
                maxLength={15}
                type="password"
                placeholder="password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              <div className="w-full flex justify-end py-1">
                <span className="text-red-500 text-xs italic">
                  {formik.errors.password}
                </span>
              </div>
            </div>
            <div className="mb-4 mt-5">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Nhập lại mật khẩu
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline `}
                maxLength={15}
                type="password"
                placeholder="confirmPassword"
                name="confirmPassword"
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
              />
              <div className="w-full flex justify-end py-1">
                <span className="text-red-500 text-xs italic">
                  {formik.errors.confirmPassword}
                </span>
              </div>
            </div>
          </div>
          <div className="w-full h-full">
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
                    rows={20}
                    className="block w-full px-0 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                    placeholder="Hãy mô tả về cửa hàng của bạn..."
                    required
                    defaultValue={""}
                    name="describe"
                    maxLength={500}
                    onChange={formik.handleChange}
                    value={formik.values.describe}
                  />
                  <div className="w-full flex justify-end py-1">
                    <span className="text-red-500 text-xs italic">
                      {formik.errors.describe}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
