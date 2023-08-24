import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  phone_store: Yup.string()
    .max(15, "Số điện thoại bé hớn 15 kí tự")
    .required("Số điện thoại không được để trống")
    .test("phone-validation", "Số điện thoại không đúng định dạng", (value) => {
      value = value.replace(/\s+/g, "");
      return /^\d{10,15}$/.test(value); // Kiểm tra định dạng số điện thoại
    }),
  name_store: Yup.string()
    .max(100, "Tên cửa hàng không quá 100 kí tự")
    .required("Vui lòng nhập tên cửa hàng"),
  time_close: Yup.string()
    .max(5, "Định dạng giờ không hợp lệ")
    .min(3, "Định dạng giờ không hợp lệ")
    .required("Vui nhập giờ đóng cửa")
    .test("isValidTime", "Định dạng giờ không hợp lệ", (value) => {
      // Sử dụng biểu thức chính quy để kiểm tra định dạng giờ (HH:mm)
      const timePattern = /^(?:2[0-3]|[01]?[0-9]):[0-5][0-9]$/;
      return timePattern.test(value);
    }),
  // address_store: Yup.string()
  // .max(150, "Địa chỉ không được vượt quá 150 kí tự")
  // .required("Vui lòng địa chỉ cửa hàng"),
  describe: Yup.string()
    .max(20000, "Mô tả quá dài")
    .required("Hãy viết vài câu mô tả về cửa hàng của bạn"),
});
