// axiosInstance.js
import axios from "axios";
import { Config } from "../configs/configs";

const instance = axios.create({
  baseURL: Config.API, // Thay thế bằng URL của API thực tế
  headers: {
    "Content-Type": "application/json", // Hoặc loại headers tương ứng với API của bạn
    // Các headers mặc định khác nếu cần
  },
  // Các tùy chọn khác của Axios
});

// Xử lý interceptor cho các trạng thái lỗi
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Kiểm tra nếu trạng thái lỗi là 401 (Unauthorized)
    if (error.response && error.response.status === 401) {
      console.log("----------->");
      // Xử lý logic tại đây để làm mới token hoặc đăng xuất người dùng
      // Ví dụ:
      // refreshToken().then(newToken => {
      //   instance.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
      //   return instance(error.config);
      // }).catch(err => {
      //   // Xử lý lỗi khi không thể làm mới token
      //   // Điều hướng đến trang đăng nhập hoặc hiển thị thông báo
      // });
    }
    return Promise.reject(error);
  }
);

export default instance;
