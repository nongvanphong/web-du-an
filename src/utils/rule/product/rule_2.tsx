import * as Yup from "yup";

export const vl2 = Yup.object().shape({
  price: Yup.string().max(10, "Giá không đúng!").required("Giá không đúng!"),

  size: Yup.string().max(10, "Size không đúng!").required("Size không đúng!"),
});
