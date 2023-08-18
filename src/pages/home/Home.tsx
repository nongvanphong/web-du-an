import { ItemAdd } from "../../component/item/ItemAdd";
import { Item } from "./item";
import Navigation from "./../../component/navigation/navigation";
import { useNavigation } from "react-router-dom";
import path from "../../utils/path/path";

export const Home = () => {
  const array = [1, 2, 3, 2, 3, 3, 3, 3, 4, 4];

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
