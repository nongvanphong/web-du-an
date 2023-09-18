import { useNavigate } from "react-router-dom";
import { ButtonCustom } from "../../../../component/ButtonCustom";
import path from "../../../../utils/path/path";
import { Input } from "../../../../component/Input";
import { useFormik } from "formik";
import { validationSchema } from "../../../../utils/rule/rule_Login";
import { valiLoginEmail } from "../../../../utils/rule/rule_LoginEmail";
import { useContext, useState } from "react";
import { AppContext } from "../../../../App";
import { useMutation, useQueryClient } from "react-query";
import { authFetch } from "../../../../fetchs/auth/authFetch";
import { Modal } from "../../../../utils/types/modal.types";

export default function LoginEmail() {
  const navigate = useNavigate();
  const { setIsShowMoadalOtp, setIsShowMoadal1 } = useContext(AppContext);
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
      setIsLoading(false);
      queryClient.invalidateQueries("data");
      window.location.href = path.home;
    },
    onError: (error: any) => {
      setIsLoading(false);
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
      email: "",
      password: "",
    },
    validationSchema: valiLoginEmail, // Sử dụng validationSchema ở đây
    onSubmit: (values) => {
      const data = {
        email: values.email,
        password: values.password,
      };
      setIsLoading(true);
      //  event.preventDefault();
      loginMutation.mutate(data);
    },
  });

  const handlClickLogin = () => {
    formik.handleSubmit();
    //  navigate(path.home);
  };

  return (
    <div className="w-[31.25rem] flex flex-col gap-10">
      <h3 className="text-3xl font-bold">Đăng nhập</h3>
      <ButtonCustom.ButtonAuth
        bg_color=" bg-white "
        taitle="Đăng nhập với số điện thoại"
        text_color="text-black"
        keys="LOGINPHONE"
      />
      <div className="flex items-center gap-5">
        <div className="w-full h-[2px] bg-black" />
        Email
        <div className="w-full h-[2px] bg-black" />
      </div>
      <div>
        <ul className="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400">
          {formik.errors.email && (
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
              {formik.errors.email}
            </li>
          )}
          {formik.errors.password && (
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
              {formik.errors.password}
            </li>
          )}
        </ul>
      </div>
      <form className="flex flex-col gap-3" onSubmit={formik.handleSubmit}>
        <Input.Input1
          name="email"
          type="text"
          maxLength={50}
          lable="Email"
          onChange={formik.handleChange}
          errorMessage={formik.errors.email}
        />
        <Input.InputPasswork
          name="password"
          type="password"
          maxLength={10}
          lable="Password"
          onChange={formik.handleChange}
          errorMessage={formik.errors.password}
        />
      </form>
      <ButtonCustom.ButtonAuth
        taitle="Đăng nhập"
        bg_color="bg-black"
        text_color="text-white"
        keys="LOGINM"
        handlClick={handlClickLogin}
        isLoading={isLoading}
      />
      <div className="text-center">
        Nếu bạn chưa có tài khoản?
        <span
          className="cursor-pointer"
          onClick={() => navigate(path.register)}
        >
          <u className="">Đăng kí</u>
        </span>
      </div>
    </div>
  );
}
