import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";

import { validationSchema } from "../../../utils/rule/rule_Login";
import { useState } from "react";
import { User } from "../../../utils/types/user.types";
import { authFetch } from "../../../fetchs/auth/authFetch";
import path from "../../../utils/path/path";

type FormStateType = Omit<User, "id">;

const initalFormState: FormStateType = {
  phone: "",
  password: "",
};

const Login = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const [formState, setFormState] = useState<FormStateType>(initalFormState);
  const [errors, setErrors] = useState({ phone: null, password: null });
  const [isFormValid, setIsFormValid] = useState(false);

  const changePageRegister = () => {
    // navigate("/auth/register");
    console.log(formState);
  };

  const handleChange =
    (name: keyof FormStateType) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormState((prev) => ({ ...prev, [name]: event.target.value }));
      validationSchema
        .validateAt(name, { [name]: event.target.value })
        .then(() => {
          setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
          setIsFormValid(validationSchema.isValidSync(formState));
        })
        .catch((err) => {
          setErrors((prevErrors) => ({ ...prevErrors, [name]: err.message }));
          setIsFormValid(false);
        });
    };

  const loginMutation = useMutation(authFetch.login, {
    onSuccess: (data) => {
      localStorage.setItem("aT", data.data.accessToken);
      localStorage.setItem("rf", data.data.refresh_token);
      localStorage.setItem("if", JSON.stringify(data.data.info));
      // Xử lý kết quả ở đây, ví dụ lưu thông tin đăng nhập vào trạng thái hoặc local storage
      // Làm mới dữ liệu sau khi đăng nhập thành công
      queryClient.invalidateQueries("data");
      window.location.href = path.home;
    },
    onError: (error: any) => {
      // Xử lý lỗi ở đây, ví dụ hiển thị thông báo lỗi đăng nhập
      if (error.response.status === 404) {
        return console.log("đăng kí tài khoản");
      }
      console.log("Login failed:-->", error.response.status);
    },
  });

  const handleSubmit = (event: any) => {
    if (isFormValid) {
      return;
    }

    loginMutation.mutate(formState);
    event.preventDefault();
  };
  return (
    <div>
      <div className="w-500-ct flex flex-col gap-20">
        <div className="text-center text-4xl font-bold">Đăng nhập</div>
        <form className=" " onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Nhập số điện thoại
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.phone ? `border border-red-500` : null
              }`}
              name="phone"
              maxLength={15}
              onChange={handleChange("phone")}
              type="text"
              placeholder="0397777777"
              value={formState.phone}
            />
            <div className="w-full flex justify-end py-1">
              <span className="text-red-500 text-xs italic">
                {errors.phone}
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
                errors.password ? `border border-red-500` : null
              }`}
              id="password"
              type="password"
              maxLength={15}
              placeholder="******************"
              onChange={handleChange("password")}
              value={formState.password}
            />
            <div className="w-full flex justify-end py-1">
              <span className="text-red-500 text-xs italic">
                {errors.password}
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
