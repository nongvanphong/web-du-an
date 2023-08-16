import instance from "../../apis/instance";

const login = async (data: any) => {
  const response = await instance.post("/auth/login", data); // Thay thế bằng endpoint thực tế
  console.log("----------->", response.data);
  return response.data;
};

export const authFetch = {
  login,
};
