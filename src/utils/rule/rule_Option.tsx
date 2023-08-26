import * as Yup from "yup";

export const vlOption = Yup.object().shape({
  price: Yup.string().max(6, "Giá không đúng!").required("Giá không đúng!"),

  size: Yup.string().max(5, "Size không đúng!").required("Size không đúng!"),
});
