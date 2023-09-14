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
const Acction = async (data: any) => {
  const response = await instance.post("/store/product/acction", data);
  return response.data;
};
const All = async (id: number) => {
  const response = await instance.get("/store/product/all"); // Thay thế bằng endpoint thực tế
  return response.data;
};
const Upadte1 = async (data: any) => {
  const response = await instance.post("/store/product/update2", data);
  return response.data;
};
const Upadte2 = async (data: any) => {
  const response = await instance.post("/store/product/update1", data, {
    headers: {
      "Content-Type": "multipart/form-data", // Đảm bảo set đúng header cho FormData
    },
  });
  return response.data;
};
const Delete = async (data: any) => {
  const response = await instance.post("/store/product/delete", data);
  return response.data;
};
export const ProductFetch = {
  Create,
  All,
  Acction,
  Upadte1,
  Upadte2,
  Delete,
};
