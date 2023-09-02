import instance from "../../apis/instance";

const login = async (data: any) => {
  const response = await instance.post("/store/auth/login", data); // Thay thế bằng endpoint thực tế
  return response.data;
};
const Register = async (data: any) => {
  const response = await instance.post("/store/auth/register", data); // Thay thế bằng endpoint thực tế
  return response.data;
};
const Sendcode = async (data: any) => {
  const response = await instance.post("/store/auth/activated", data); // Thay thế bằng endpoint thực tế
  return response.data;
};
export const authFetch = {
  login,
  Register,
  Sendcode,
};
