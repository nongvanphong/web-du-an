import * as Yup from "yup";

export const validationSchemaRegister = Yup.object().shape({
  phone: Yup.string()
    .max(15, "Số điện thoại bé hớn 15 kí tự")
    .required("Số điện thoại không được để trống")
    .test("phone-validation", "Số điện thoại không đúng định dạng", (value) => {
      value = value.replace(/\s+/g, "");
      return /^\d{10,15}$/.test(value); // Kiểm tra định dạng số điện thoại
    }),
  password: Yup.string()
    .max(15, "Mật khẩu phải bé hớn 15 kí tự")
    .min(6, "Mật khẩu phải lớn hớn 5 kí tự")
    .required("mật khẩu không được để trống"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Mật khẩu không khớp.")
    .required("Vui lòng xác nhận mật khẩu."),
});
