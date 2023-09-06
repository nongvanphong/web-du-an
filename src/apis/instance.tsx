// axiosInstance.js
import axios from "axios";
import { Config } from "../configs/configs";
import { useContext } from "react";
import { AppContext } from "../App";
import path from "../utils/path/path";

const instance = axios.create({
  baseURL: Config.API, // Thay thế bằng URL của API thực tế

  headers: {
    "Content-Type": "application/json", // Hoặc loại headers tương ứng với API của bạn
    // Các headers mặc định khác nếu cần
  },
  withCredentials: false,
  // Các tùy chọn khác của Axios
});

instance.interceptors.request.use(
  (config) => {
    const AT = localStorage.getItem("aT");
    if (AT) {
      config.headers["Authorization"] = `Bearer ${AT}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Xử lý interceptor cho các trạng thái lỗi
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (
      error.response.status === 400 &&
      error.response.msg === "User does not exist!"
    ) {
      window.location.href = path.premissions;
    }
    if (error.response && error.response.status === 401) {
      // setTimeout(() => {
      // Xử lý logic tại đây để làm mới token hoặc đăng xuất người dùng
      // Ví dụ:
      refreshToken()
        .then((newToken) => {
          instance.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${newToken}`;
          localStorage.setItem("aT", newToken);
          return instance(error.config);
        })
        .catch((err) => {});
      // }, 10000);
    }

    return Promise.reject(error);
  }
);
// Hàm làm mới token
async function refreshToken() {
  const rf = localStorage.getItem("rf");
  // Thực hiện logic làm mới token và trả về promise chứa token mới
  return instance
    .post("/store/auth/refreshtoken", {
      refreshToken: rf,
    })
    .then((response) => {
      return response.data.data.accessToken;
    });
}
export default instance;
