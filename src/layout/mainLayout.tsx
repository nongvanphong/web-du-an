import iconFitter from "../../src/assets/icon/svg/fitter.svg";
import iconChip from "../../src/assets/icon/svg/chip.svg";

import avt from "../../src/assets/image/avt.svg";
import path from "../utils/path/path";
import { useNavigate } from "react-router-dom";
import Navigation from "../component/navigation/navigation";

interface Props {
  children?: React.ReactNode;
}
export const MainLayout = ({ children }: Props) => {
  return (
    <div className="w-full h-screen bg-ct-orange p-ct-50">
      <div className="w-full h-full bg-ct-white flex rounded-3xl overflow-hidden">
        <Navigation />

        <div className="w-full h-full bg-gray-ct pt-3">
          <div className="w-full h-14 flex justify-between py-1 px-5">
            <div>To day, 08-08-2022</div>
            <div className="input input-bordered input-warning w-full max-w-md rounded-2xl px-5  flex items-center bg-white">
              <input
                type="text"
                placeholder="Tìm kiếm"
                className="w-full h-full rounded-2xl focus:outline-none pr-5 "
              />
              <img src={iconFitter} alt="filter" className="w-8 h-8" />
            </div>
          </div>
          <div className="w-full h-full px-5 pt-5 overflow-hidden">
            {children}
          </div>
        </div>
        <div className="w-500-ct h-full bg-white p-5">
          <div className=" w-full flex justify-end">
            <img
              src={avt}
              className="w-16 h-16 bg-slate-400 rounded-full mr-2"
            />
            <span>nguyễn văn a</span>
          </div>
          <div className="w-full h-52 bg-orage-100-ct rounded-3xl mt-5 p-5 flex flex-col justify-between">
            <div className="w-full flex justify-between">
              <span>
                <b className="text-2xl text-white">quán gà cháy</b>
              </span>
              <span>
                <i className=" text-white">Visa</i>
              </span>
            </div>
            <div className="w-full flex justify-between items-end">
              <span className=" text-white">
                <b> 10.000.000</b>
                VNĐ
              </span>
              <img src={iconChip} className="w-20 h-14"></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
