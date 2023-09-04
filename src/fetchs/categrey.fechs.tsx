import instance from "../apis/instance";

const All = async () => {
  const response = await instance.get("store/categrey/all"); // Thay thế bằng endpoint thực tế
  return response.data;
};

export const CategreyFetch = {
  All,
};
