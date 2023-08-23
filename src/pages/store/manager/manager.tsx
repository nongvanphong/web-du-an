import { useNavigate } from "react-router-dom";
import drink from "../../../assets/image/drink.png";
import food from "../../../assets/image/food.png";
import path from "../../../utils/path/path";
export default function Manager() {
  const navigate = useNavigate();
  return (
    <div className="w-full h-full">
      <span className="text-2xl font-bold">Quản lý</span>
      <div className="flex flex-col gap-5 mt-5">
        <div
          className="w-full h-32 bg-orage-100-ct rounded-3xl flex items-center cursor-pointer"
          onClick={() => navigate(path.managerfood)}
        >
          <img src={food} alt="food" className="w-32 h-32 rounded-3xl" />
          <span className="ml-24 text-xl text-white">
            Quản lí danh sách món ăn của bạn
          </span>
        </div>
        <div
          className="w-full h-32 bg-blude-30-ct rounded-3xl flex items-center cursor-pointer"
          onClick={() => navigate(path.managerListDrink)}
        >
          <img src={drink} alt="drink" className="w-32 h-32 rounded-3xl" />
          <span className="ml-24 text-xl">
            Quản lí danh sách các loại nước uống
          </span>
        </div>
      </div>
    </div>
  );
}
