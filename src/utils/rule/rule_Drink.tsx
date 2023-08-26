import * as Yup from "yup";

export const vlDrink = Yup.object().shape({
  name_product: Yup.string()
    .max(30, "Tên đồ uống không được quá 15 kí tự")
    .required("Tên đồ uống không được để trống"),

  detail: Yup.string()
    .max(10000, "Mô tả quá dài")
    .required("Vui lòng nhập mô tả về đồ uống"),
});
