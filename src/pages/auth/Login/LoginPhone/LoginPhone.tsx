import { useNavigate } from "react-router-dom";
import { Input } from "../../../../component/Input";
import { ButtonCustom } from "../../../../component/ButtonCustom";
import path from "../../../../utils/path/path";
import { useFormik } from "formik";
import { validationSchema } from "../../../../utils/rule/rule_Login";
import { error } from "console";

export default function LoginPhone() {
  const navigate = useNavigate();
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

      console.log("====>", data);
    },
  });
  return (
    <div className="w-[31.25rem] flex flex-col gap-10">
      <h3 className="text-3xl font-bold">Đăng nhập</h3>
      <ButtonCustom.ButtonAuth
        bg_color=" bg-white "
        taitle="Đăng nhập với email"
        text_color="text-black"
        keys="LOGINEMAIL"
      />
      <div className="flex items-center gap-5">
        <div className="w-full h-[2px] bg-black" />
        Phone
        <div className="w-full h-[2px] bg-black" />
      </div>

      <div>
        <ul className="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400">
          {formik.errors.phone && (
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
              {formik.errors.phone}
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
          name="phone"
          type="text"
          maxLength={10}
          lable="Phone"
          onChange={formik.handleChange}
          errorMessage={formik.errors.phone}
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
        keys="NULL"
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
