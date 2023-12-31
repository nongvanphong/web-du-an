import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";

import { validationSchema } from "../../../utils/rule/rule_Login";
import { useContext, useEffect, useState } from "react";
import { authFetch } from "../../../fetchs/auth/authFetch";
import path from "../../../utils/path/path";
import { AppContext } from "../../../App";
import { useFormik } from "formik";
import { Modal } from "../../../utils/types/modal.types";

const Login = () => {
  const { setIsShowMoadalOtp, setIsShowMoadal1 } = useContext(AppContext);

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const loginMutation = useMutation(authFetch.login, {
    onSuccess: (data) => {
      // if (data.data.info.status == 1) {
      //   setIsShowMoadal1((p: Modal) => ({
      //     ...p,
      //     isHidden: true,
      //     taile: "Tài khoản của bạn chưa được xác minh!",
      //   }));
      //   return;
      // }

      localStorage.setItem("aT", data.data.accessToken);
      localStorage.setItem("rf", data.data.refresh_token);
      localStorage.setItem("if", JSON.stringify(data.data.info));
      // Xử lý kết quả ở đây, ví dụ lưu thông tin đăng nhập vào trạng thái hoặc local storage
      // Làm mới dữ liệu sau khi đăng nhập thành công
      queryClient.invalidateQueries("data");
      window.location.href = path.store;
    },
    onError: (error: any) => {
      if (error.response.status === 403) {
        switch (error.response.data.msg) {
          case "verify Otp!":
            setIsShowMoadal1((p: Modal) => ({
              ...p,
              isHidden: true,
              taile: "Tài khoản của bạn chưa được xác minh!",
              tailebnt2: "Tiếp tục xác minh",
              showBotton: 2,
              type: "VERIFY_OTP",
            }));
            return;

          case "lock account!":
            setIsShowMoadal1((p: Modal) => ({
              ...p,
              isHidden: true,
              taile: "Tài khoản của bạn đã bị khóa",
              tailebnt1: "Đóng",
              showBotton: 1,
            }));
            return;

          case "Wait for admin to verify":
            setIsShowMoadal1((p: Modal) => ({
              ...p,
              isHidden: true,
              taile: "Tài khoản của bạn đang đợi admin xét duyệt",
              tailebnt1: "Đóng",
              showBotton: 1,
            }));
            return;
        }
      }
      setIsShowMoadal1((p: Modal) => ({
        ...p,
        isHidden: true,
        taile: "Tài khoản hoặc mật khẩu không chính xác!",
        tailebnt1: "Đóng",
        showBotton: 1,
      }));
    },
  });

  const formik = useFormik({
    initialValues: {
      phone: "",
      password: "",
    },
    validationSchema: validationSchema, // Sử dụng validationSchema ở đây
    onSubmit: (values) => {
      // Call your custom submit function
      //  console.log("===>", values);
      //event.preventDefault();
      const data = {
        email: "",
        phone: values.phone,
        password: values.password,
      };

      loginMutation.mutate(data);
    },
  });

  const changePageRegister = () => {
    navigate(path.register);
  };

  return (
    <div>
      <div className="w-500-ct flex flex-col gap-20">
        <div className="text-center text-4xl font-bold">Đăng nhập</div>
        <form className=" " onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Nhập số điện thoại
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                formik.errors.phone ? `border border-red-500` : null
              }`}
              name="phone"
              maxLength={10}
              onChange={formik.handleChange}
              type="text"
              placeholder="0397777777"
              value={formik.values.phone}
            />
            <div className="w-full flex justify-end py-1">
              <span className="text-red-500 text-xs italic">
                {formik.errors.phone}
              </span>
            </div>
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Nhập mật khẩu
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                formik.errors.password ? `border border-red-500` : null
              }`}
              id="password"
              type="password"
              maxLength={15}
              placeholder="******************"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            <div className="w-full flex justify-end py-1">
              <span className="text-red-500 text-xs italic">
                {formik.errors.password}
              </span>
            </div>
          </div>

          <div className="w-full flex flex-col gap-5 px-14">
            <button
              className="bg-orage-70-ct hover:bg-orage-100-ct text-white font-bold py-3 px-4  focus:outline-none focus:shadow-outline rounded-2xl"
              type="submit"
            >
              Đăng nhập
            </button>

            <button
              onClick={changePageRegister}
              className="bg-orage-70-ct hover:bg-orage-100-ct text-white font-bold py-3 px-4 rounded-2xl focus:outline-none focus:shadow-outline"
              type="button"
            >
              Đăng kí
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
