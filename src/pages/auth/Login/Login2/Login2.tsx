import { useNavigate } from "react-router-dom";

import { ButtonCustom } from "../../../../component/ButtonCustom";
import path from "../../../../utils/path/path";
import { useEffect } from "react";

export default function Login2() {
  const navigate = useNavigate();

  return (
    <div className="w-[31.25rem] flex flex-col gap-10">
      <h3 className="text-3xl font-bold">Đăng nhập vào ứng dụng</h3>
      <ButtonCustom.ButtonAuth
        taitle="Đăng nhập với email"
        bg_color="bg-black"
        text_color="text-white"
        keys="LOGINEMAIL"
      />
      <div className="flex items-center gap-5">
        <div className="w-full h-[2px] bg-black" />
        hoặc
        <div className="w-full h-[2px] bg-black" />
      </div>
      <ButtonCustom.ButtonAuth
        bg_color=" bg-white "
        taitle="Đăng nhập với số điện thoại"
        text_color="text-black"
        keys="LOGINPHONE"
      />
      <div className="text-center">
        Nếu bạn chưa có tài khoản?
        <span
          className="cursor-pointer"
          onClick={() => navigate(path.register)}
        >
          <u className="">Đăng kí</u>
        </span>
      </div>
    </div>
  );
}
