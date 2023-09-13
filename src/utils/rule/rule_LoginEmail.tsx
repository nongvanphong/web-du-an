import * as Yup from "yup";

export const valiLoginEmail = Yup.object().shape({
  email: Yup.string().max(50, "").required("Email không được để trống"),
  password: Yup.string().max(15, "").required("Mật khẩu không được để trống"),
  // .test("phone-validation", "Số điện thoại không đúng định dạng", (value) => {
  //   value = value.replace(/\s+/g, "");
  //   return /^\d{10,15}$/.test(value); // Kiểm tra định dạng số điện thoại
  // }),
});
