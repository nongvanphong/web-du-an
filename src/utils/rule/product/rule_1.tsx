import * as Yup from "yup";

export const vl1 = Yup.object().shape({
  name_product: Yup.string().required("Vui lòng nhập tên sản phẩm"),

  detail: Yup.string().required("Vui lòng nhập mô tả sản phẩm"),
});
