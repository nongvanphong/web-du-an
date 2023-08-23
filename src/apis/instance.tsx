// axiosInstance.js
import axios from "axios";
import { Config } from "../configs/configs";
import { useContext } from "react";
import { AppContext } from "../App";

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
    console.log("--------------------------->", AT);
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
    if (error.response.status === 400) {
      console.log(
        ".............................đăng nhập lại...................................."
      );
    }
    if (error.response && error.response.status === 401) {
      // Xử lý logic tại đây để làm mới token hoặc đăng xuất người dùng
      // Ví dụ:
      refreshToken()
        .then((newToken) => {
          instance.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${newToken}`;
          console.log(newToken);
          localStorage.setItem("aT", newToken);
          return instance(error.config);
        })
        .catch((err) => {});
    }

    return Promise.reject(error);
  }
);
// Hàm làm mới token
async function refreshToken() {
  const rf = localStorage.getItem("rf");
  console.log("pppp", rf);
  // Thực hiện logic làm mới token và trả về promise chứa token mới
  return instance
    .post(
      "/auth/refreshtoken",
      //gửi body
      {
        headers: {
          // Gửi header Authorization với token hiện tại
          Authorization: `Bearer ${rf}`,
        },
      }
    )
    .then((response) => {
      console.log("-----<<<<", response);
      return response.data.newToken;
    });
}
export default instance;
