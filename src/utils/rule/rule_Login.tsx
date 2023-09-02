import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  phone: Yup.string().max(15, "").required("Số điện thoại không được để trống"),
  password: Yup.string().max(15, "").required("mật khẩu không được để trống"),
  // .test("phone-validation", "Số điện thoại không đúng định dạng", (value) => {
  //   value = value.replace(/\s+/g, "");
  //   return /^\d{10,15}$/.test(value); // Kiểm tra định dạng số điện thoại
  // }),
});
