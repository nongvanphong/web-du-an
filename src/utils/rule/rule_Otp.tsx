import * as Yup from "yup";

export const vlOtp = Yup.object().shape({
  n1: Yup.number().max(9, "lỗi").min(0, "").required("lỗi"),
  n2: Yup.number().max(9, "lỗi").min(0, "").required("lỗi"),
  n3: Yup.number().max(9, "lỗi").min(0, "").required("lỗi"),
  n4: Yup.number().max(9, "lỗi").min(0, "").required("lỗi"),
  n5: Yup.number().max(9, "lỗi").min(0, "").required("lỗi"),
  n6: Yup.number().max(9, "lỗi").min(0, "").required("lỗi"),
});
