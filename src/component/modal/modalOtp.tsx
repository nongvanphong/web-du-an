import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import { useFormik } from "formik";
import { vlOtp } from "../../utils/rule/rule_Otp";
import { useMutation } from "react-query";
import { authFetch } from "../../fetchs/auth/authFetch";
import path from "../../utils/path/path";

// type data = {
//   isShow: boolean;
//   mailAdress: string;
//   handldleRefresh: () => void;
//   handldSend: () => void;
// };

export default function ModalOtp() {
  const { isShowMoadalOtp } = useContext(AppContext);

  const loginMutation = useMutation(authFetch.Sendcode, {
    onSuccess: (data) => {
      // Xử lý kết quả ở đây, ví dụ lưu thông tin đăng nhập vào trạng thái hoặc local storage
      // Làm mới dữ liệu sau khi đăng nhập thành công
      //window.location.reload();
      window.location.href = path.login;
    },
    onError: (error: any) => {
      console.log("===>lỗi=>", error);
      // Xử lý lỗi ở đây, ví dụ hiển thị thông báo lỗi đăng nhập
      // if (error.response.status === 400) {
      //   appContext.setIsHidden(true, "Đăng kí thất bại!", "Đóng");
      //   return;
      // }
    },
  });

  const formik = useFormik({
    initialValues: {
      n1: "",
      n2: "",
      n3: "",
      n4: "",
      n5: "",
      n6: "",
    },
    validationSchema: vlOtp, // Sử dụng validationSchema ở đây
    onSubmit: async (v) => {
      const newData = {
        email: "nongvanphong21012002@gmail.com",
        codes: `${v.n1}${v.n2}${v.n3}${v.n4}${v.n5}${v.n6}`,
      };
      loginMutation.mutate(newData);
    },
  });
  const initialTime = 180; // Thời gian ban đầu (3 phút = 180 giây)
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    const timer = setInterval(() => {
      if (time > 0) {
        setTime(time - 1);
      } else {
        clearInterval(timer);
        // Thời gian đếm lùi đã đạt 0
      }
    }, 1000); // Cập nhật mỗi giây

    return () => {
      clearInterval(timer); // Xóa timer khi component bị unmount
    };
  }, [time]);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const handleRefresh = () => {
    const newData = {
      email: "nongvanphong21012002@gmail.com",
      codes: null,
    };
    loginMutation.mutate(newData);
    setTime(180);
  };
  return (
    <div
      style={{
        backgroundColor: "rgba(128, 128, 128, 0.5) ",
        display: isShowMoadalOtp ? "flex" : "none",
      }}
      className="absolute w-full h-full px-3 -translate-x-1/2 -translate-y-1/2  top-1/2 left-1/2"
    >
      <div className="absolute   -translate-x-1/2 -translate-y-1/2  top-1/2 left-1/2">
        <div className="container mx-auto">
          <div className="max-w-sm mx-auto md:max-w-lg">
            <div className="w-full">
              <form
                onSubmit={formik.handleSubmit}
                className="bg-white  py-10 px-10 rounded text-center"
              >
                <h1 className="text-2xl font-bold">OTP</h1>
                <div className="flex flex-col mt-4">
                  <span>OTP đã được gửi</span>
                  <span className="font-bold">{"props.mailAdress"}</span>
                </div>
                <div
                  id="otp"
                  className="flex flex-row justify-center text-center px-2 mt-5"
                >
                  <input
                    className={`m-2 border ${
                      formik.errors.n1 ? `border-red-600` : null
                    } h-10 w-10 text-center form-control rounded`}
                    type="text"
                    id="first"
                    maxLength={1}
                    onChange={formik.handleChange}
                    value={formik.values.n1}
                    name="n1"
                  />
                  <input
                    className={`m-2 border ${
                      formik.errors.n2 ? `border-red-600` : null
                    } h-10 w-10 text-center form-control rounded`}
                    type="text"
                    id="second"
                    maxLength={1}
                    onChange={formik.handleChange}
                    value={formik.values.n2}
                    name="n2"
                  />
                  <input
                    className={`m-2 border ${
                      formik.errors.n3 ? `border-red-600` : null
                    } h-10 w-10 text-center form-control rounded`}
                    type="text"
                    id="third"
                    maxLength={1}
                    onChange={formik.handleChange}
                    value={formik.values.n3}
                    name="n3"
                  />
                  <input
                    className={`m-2 border ${
                      formik.errors.n4 ? `border-red-600` : null
                    } h-10 w-10 text-center form-control rounded`}
                    type="text"
                    id="fourth"
                    maxLength={1}
                    onChange={formik.handleChange}
                    value={formik.values.n4}
                    name="n4"
                  />
                  <input
                    className={`m-2 border ${
                      formik.errors.n5 ? `border-red-600` : null
                    } h-10 w-10 text-center form-control rounded`}
                    type="text"
                    id="fifth"
                    maxLength={1}
                    onChange={formik.handleChange}
                    value={formik.values.n5}
                    name="n5"
                  />
                  <input
                    className={`m-2 border ${
                      formik.errors.n6 ? `border-red-600` : null
                    } h-10 w-10 text-center form-control rounded`}
                    type="text"
                    id="sixth"
                    maxLength={1}
                    onChange={formik.handleChange}
                    value={formik.values.n6}
                    name="n6"
                  />
                </div>

                <div className="flex flex-col w-full justify-center text-center mt-5">
                  <button
                    className=" px-5 py-2 bg-green-80-ct rounded-md text-white cursor-pointer"
                    //  type="submit" // Để tránh hành vi mặc định của nút submit trong form
                  >
                    <span>Gửi</span>
                  </button>
                  {time > 0 ? (
                    <p>
                      {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                    </p>
                  ) : (
                    <a
                      onClick={handleRefresh}
                      className="
                   items-center text-blue-700 hover:text-blue-900 cursor-pointer"
                    >
                      <span className="font-bold">Resend OTP</span>
                      <i className="bx bx-caret-right ml-1" />
                    </a>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
