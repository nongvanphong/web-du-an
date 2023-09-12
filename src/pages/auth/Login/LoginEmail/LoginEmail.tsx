import { useNavigate } from "react-router-dom";
import { ButtonCustom } from "../../../../component/ButtonCustom";
import path from "../../../../utils/path/path";
import { Input } from "../../../../component/Input";

export default function LoginEmail() {
  const navigate = useNavigate();
  return (
    <div className="w-[31.25rem] flex flex-col gap-10">
      {/* <h3 className="text-3xl font-bold">Đăng nhập</h3>
      <ButtonCustom.ButtonAuth
        bg_color=" bg-white "
        taitle="Đăng nhập với số điện thoại"
        text_color="text-black"
        keys="LOGINPHONE"
      />
      <div className="flex items-center gap-5">
        <div className="w-full h-[2px] bg-black" />
        Email
        <div className="w-full h-[2px] bg-black" />
      </div>
      <Input.Input1 />
      <Input.InputPasswork />
      <ButtonCustom.ButtonAuth
        taitle="Đăng nhập"
        bg_color="bg-black"
        text_color="text-white"
        keys="NULL"
      />
      <div className="text-center">
        Nếu bạn chưa có tài khoản?
        <span
          className="cursor-pointer"
          onClick={() => navigate(path.register)}
        >
          <u className="">Đăng kí</u>
        </span>
      </div> */}
    </div>
  );
}
