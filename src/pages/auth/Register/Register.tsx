import { useNavigate } from "react-router-dom";
import { User } from "../../../utils/types/user.types";
import { useContext, useState } from "react";
import { AppContext } from "../../../App";
import { useMutation, useQueryClient } from "react-query";
import { validationSchema } from "../../../utils/rule/rule_Login";
import path from "../../../utils/path/path";
import { useFormik } from "formik";
import { validationSchemaRegister } from "../../../utils/rule/rule_register";

type confirmPassword = {
  confirmPassword?: string;
};
type FormStateType = Omit<User, "id"> & confirmPassword;

const initalFormState: FormStateType = {
  phone: "",
  password: "",
  confirmPassword: "",
};
export default function Register() {
  const navigate = useNavigate();

  const appContext = useContext(AppContext);

  const queryClient = useQueryClient();

  const formik = useFormik({
    initialValues: {
      phone: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchemaRegister, // Sử dụng validationSchema ở đây
    onSubmit: (values) => {
      // Call your custom submit function
      console.log("===>", values);
    },
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const changePage = () => {
    navigate(path.login);
  };
  //const handleChange =
  // (name: keyof FormStateType) =>
  // (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  //   setFormState((prev) => ({ ...prev, [name]: event.target.value }));

  //   validationSchema
  //     .validateAt(name, { [name]: event.target.value })
  //     .then(() => {
  //       setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  //       setIsFormValid(validationSchema.isValidSync(formState));
  //     })
  //     .catch((err) => {
  //       setErrors((prevErrors) => ({ ...prevErrors, [name]: err.message }));
  //       setIsFormValid(false);
  //     });
  // };

  // const loginMutation = useMutation(authFetch.login, {
  //   onSuccess: (data) => {

  //     // Xử lý kết quả ở đây, ví dụ lưu thông tin đăng nhập vào trạng thái hoặc local storage
  //     // Làm mới dữ liệu sau khi đăng nhập thành công
  //     queryClient.invalidateQueries("data");
  //     navigate(path.login);
  //   },
  //   onError: (error: any) => {
  //     // Xử lý lỗi ở đây, ví dụ hiển thị thông báo lỗi đăng nhập
  //     if (error.response.status === 404) {
  //       appContext.setIsHidden(
  //         true,
  //         "Cảnh báo",
  //         "Bạn chưa có tài khoản!",
  //         "Đóng"
  //       );
  //       return;
  //     }
  //     appContext.setIsHidden(
  //       true,
  //       "Cảnh báo",
  //       "Tài khoản hoặc mật khẩu không chính xác!",
  //       "Đóng"
  //     );
  //   },
  // });

  const handleSubmit = (event: any) => {
    if (isFormValid) {
      return;
    }
    event.preventDefault();
    // loginMutation.mutate(formState);
  };
  return (
    <div>
      <div className="w-500-ct flex flex-col gap-20">
        <div className="text-center text-4xl font-bold">Đắng kí</div>
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
              name="password"
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
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Nhập lại mật khẩu
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                formik.errors.confirmPassword ? `border border-red-500` : null
              }`}
              name="confirmPassword"
              type="password"
              maxLength={15}
              placeholder="******************"
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
            />
            <div className="w-full flex justify-end py-1">
              <span className="text-red-500 text-xs italic">
                {formik.errors.confirmPassword}
              </span>
            </div>
          </div>
          <div className="w-full flex flex-col gap-5 px-14">
            <button
              className="bg-orage-70-ct hover:bg-orage-100-ct text-white font-bold py-3 px-4  focus:outline-none focus:shadow-outline rounded-2xl"
              type="submit"
            >
              Đăng kí
            </button>

            <button
              onClick={changePage}
              className="bg-orage-70-ct hover:bg-orage-100-ct text-white font-bold py-3 px-4 rounded-2xl focus:outline-none focus:shadow-outline"
              type="button"
            >
              Đăng nhập
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
