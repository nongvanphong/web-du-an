import { ItemAdd } from "../../component/item/ItemAdd";
import { Item } from "./item";
import Navigation from "./../../component/navigation/navigation";
import { useNavigate, useNavigation } from "react-router-dom";
import path from "../../utils/path/path";
import { useContext, useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";
import { AppContext } from "../../App";
import { storeFetch } from "../../fetchs/store/store";

export const Home = () => {
  const array = [1, 2, 3, 2, 3, 3, 3, 3, 4, 4];
  const navigate = useNavigate();
  const appContext = useContext(AppContext);
  const queryClient = useQueryClient();
  const loginMutation = useMutation(storeFetch.getAllStore, {
    onSuccess: (data) => {
      console.log("pppppppppppppppppppp", data);
      // Xử lý kết quả ở đây, ví dụ lưu thông tin đăng nhập vào trạng thái hoặc local storage
      // Làm mới dữ liệu sau khi đăng nhập thành công
      queryClient.invalidateQueries("data");
      //  navigate(path.login);
    },
    onError: (error: any) => {
      console.log("rrrrrrrrrrrrrrrrrrrrrr", error);
      // // Xử lý lỗi ở đây, ví dụ hiển thị thông báo lỗi đăng nhập
      // if (error.response.status === 409) {
      //   appContext.setIsHidden(true, "Số điện thoại đã được sử dụng!", "Đóng");
      //   return;
      // }
      // appContext.setIsHidden(
      //   true,

      //   "Đăng kí thất bại!",
      //   "Đóng"
      // );
    },
  });

  useEffect(() => {
    loginMutation.mutate();
  }, []);

  const hanleClick = () => {
    window.location.href = path.registerSrore;
  };
  return (
    <div className="w-full h-screen bg-ct-orange p-ct-50 ">
      <div className="hidden-scroll-a  w-full h-full bg-ct-white flex rounded-3xl  p-12 overflow-x-hidden overflow-y-scroll">
        <div className="grid grid-cols-3  gap-10 w-full">
          {array.map((i) => (
            <Item />
          ))}
          <div className="h-64 cursor-pointer ">
            <ItemAdd handleClick={hanleClick} />
          </div>
        </div>
      </div>
    </div>
  );
};
