import instance from "../apis/instance";
import { Product } from "../utils/types/product.types";

const Create = async (data: any) => {
  const response = await instance.post("/store/product/create", data, {
    headers: {
      "Content-Type": "multipart/form-data", // Đảm bảo set đúng header cho FormData
    },
  }); // Thay thế bằng endpoint thực tế
  return response.data;
};
export const ProductFetch = {
  Create,
};
