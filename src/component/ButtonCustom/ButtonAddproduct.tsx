import { useNavigate } from "react-router-dom";
import AddProduct from "./../../pages/product/Addproduct/AddProduct";
import path from "../../utils/path/path";

export default function ButtonAddproduct() {
  const navigate = useNavigate();
  return (
    <div
      className="w-full h-11 bg-blue-ct rounded-xl flex justify-center items-center cursor-pointer"
      onClick={() => navigate(path.AddProduct)}
    >
      <span className=" text-white">Thêm sản phẩm</span>
    </div>
  );
}
