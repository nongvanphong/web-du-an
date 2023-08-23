import instance from "../../apis/instance";

const getAllStore = async () => {
  const response = await instance.get("/store/all"); // Thay thế bằng endpoint thực tế
  return response.data;
};
export const storeFetch = {
  getAllStore,
};
