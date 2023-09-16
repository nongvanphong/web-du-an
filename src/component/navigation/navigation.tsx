import iconHome from "../../assets/icon/svg/home.svg";
import iconHomeBlack from "../../assets/icon/svg/homeblack.svg";

import iconSetting from "../../assets/icon/svg/setting.svg";
import iconSettingWhite from "../../assets/icon/svg/settingwhite.svg";
import iconLogout from "../../assets/icon/svg/logout.svg";
import { useLocation, useNavigate } from "react-router-dom";

import { useState } from "react";
import path from "../../utils/path/path";

export default function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  // Add more cases for other options

  return (
    <div className="w-full h-full p-3 bg-white flex flex-col gap-5 py-5 items-center">
      <div
        className={`w-full h-10 ${
          location.pathname == path.home ? `bg-blue-ct` : null
        } rounded-full flex pl-5 items-center cursor-pointer`}
        onClick={() => navigate(path.home)}
      >
        <img
          src={location.pathname == path.home ? iconHome : iconHomeBlack}
          alt="home"
          style={{ stroke: "#bbb", fill: "#f665" }}
          className="w-6 h-6 stroke-slate-500 fill-slate-600 "
        />
        <span
          className={`pl-3 ${
            location.pathname == path.home ? `text-white` : `text-black`
          }`}
        >
          Đơn hàng
        </span>
      </div>
      <div
        className={`w-full h-10 ${
          location.pathname == path.product ||
          location.pathname == path.AddProduct
            ? `bg-blue-ct`
            : null
        } rounded-full flex pl-5 items-center cursor-pointer`}
        onClick={() => navigate(path.product)}
      >
        <img
          src={
            location.pathname == path.product ||
            location.pathname == path.AddProduct
              ? iconSettingWhite
              : iconSetting
          }
          alt="setting"
          className="w-6 h-6"
        />
        <span className="pl-3">Sản phẩm</span>
      </div>
      <div
        className={`w-full h-10 ${
          location.pathname == path.pay ? `bg-blue-ct` : null
        } rounded-full flex pl-5 items-center cursor-pointer`}
        onClick={() => navigate(path.pay)}
      >
        <img
          src={location.pathname == path.pay ? iconHome : iconHomeBlack}
          alt="home"
          style={{ stroke: "#bbb", fill: "#f665" }}
          className="w-6 h-6 stroke-slate-500 fill-slate-600 "
        />
        <span
          className={`pl-3 ${
            location.pathname == path.pay ? `text-white` : `text-black`
          }`}
        >
          Thống kê
        </span>
      </div>
      <div
        className={`w-full h-10 ${
          location.pathname == path.chart ? `bg-blue-ct` : null
        } rounded-full flex pl-5 items-center cursor-pointer`}
        onClick={() => navigate(path.chart)}
      >
        <img
          src={location.pathname == path.chart ? iconHome : iconHomeBlack}
          alt="home"
          style={{ stroke: "#bbb", fill: "#f665" }}
          className="w-6 h-6 stroke-slate-500 fill-slate-600 "
        />
        <span
          className={`pl-3 ${
            location.pathname == path.chart ? `text-white` : `text-black`
          }`}
        >
          Hóa đơn
        </span>
      </div>
      <div className="w-11 h-11  rounded-full flex justify-center items-center">
        <img src={iconLogout} alt="logout" className="w-6 h-6" />
      </div>
    </div>
  );
}
