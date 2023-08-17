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
    <div className="w-28 h-full bg-white flex flex-col gap-5 py-5 items-center">
      <div
        className={`w-11 h-11 ${
          location.pathname == path.store ? `bg-orage-100-ct` : null
        } rounded-full flex justify-center items-center cursor-pointer`}
        onClick={() => navigate(path.store)}
      >
        <img
          src={location.pathname == path.store ? iconHome : iconHomeBlack}
          alt="home"
          style={{ stroke: "#bbb", fill: "#f665" }}
          className="w-6 h-6 stroke-slate-500 fill-slate-600 "
        />
      </div>
      <div
        className={`w-11 h-11 ${
          location.pathname == path.manager ? `bg-orage-100-ct` : null
        } rounded-full flex justify-center items-center cursor-pointer`}
        onClick={() => navigate(path.manager)}
      >
        <img
          src={
            location.pathname == path.manager ? iconSettingWhite : iconSetting
          }
          alt="setting"
          className="w-6 h-6"
        />
      </div>
      <div className="w-11 h-11  rounded-full flex justify-center items-center">
        <img src={iconLogout} alt="logout" className="w-6 h-6" />
      </div>
    </div>
  );
}
