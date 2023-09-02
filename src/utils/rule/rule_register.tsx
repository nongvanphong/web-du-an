import * as Yup from "yup";

export const valiRegister = Yup.object().shape({
  email: Yup.string()
    .max(50, "Email vượt quá số kí tự cho phép")
    .required("Email chưa được nhập")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Không đúng định dạng email yêu cầu"
    ),
  store_phone_number: Yup.string()
    .max(10, "Số điện thoại không đúng định dạng")
    .required("Số điện thoại không đúng định dạng")
    .test("phone-validation", "Số điện thoại không đúng định dạng", (value) => {
      value = value.replace(/\s+/g, "");
      return /^\d{10,15}$/.test(value); // Kiểm tra định dạng số điện thoại
    }),
  manager_phone_number: Yup.string()
    .max(10, "Số điện thoại không đúng định dạng")
    .required("Số điện thoại không đúng định dạng")
    .test("phone-validation", "Số điện thoại không đúng định dạng", (value) => {
      value = value.replace(/\s+/g, "");
      return /^\d{10,15}$/.test(value); // Kiểm tra định dạng số điện thoại
    }),
  store_name: Yup.string()
    .max(100, "Tên cửa hàng vượt quá số kí tự cho phép")
    .required("Vui lòng nhập tên cửa hàng"),
  address: Yup.string()
    .max(150, "Địa chỉ vượt quá số kí tự cho phép")
    .required("Vui lòng địa chỉ cửa hàng"),
  describe: Yup.string()
    .max(5000, "Mô tả vượt quá số kí tự cho phép")
    .required("Hãy viết vài câu mô tả về cửa hàng của bạn"),
  password: Yup.string()
    .max(15, "Mật khẩu phải bé hớn 15 kí tự")
    .min(6, "Mật khẩu phải lớn hớn 5 kí tự")
    .required("mật khẩu không được để trống"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Mật khẩu không khớp.")
    .required("Vui lòng xác nhận mật khẩu."),
});
