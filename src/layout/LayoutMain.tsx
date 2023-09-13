import Navigation from "../component/navigation/navigation";
import { Search } from "../component/search";

interface Props {
  children?: React.ReactNode;
  taitle?: string;
  classname?: string;
}
export const LayoutMain = ({ children, taitle, classname }: Props) => {
  return (
    <div className="w-full h-screen">
      <div className="w-full h-screen flex">
        <div className="w-[200px] h-screen bg-white">
          <div className="w-full h-20 bg-red-200 flex justify-center items-center">
            <h2 className="font-bold text-4xl"> Elephan</h2>
          </div>
          <div className="w-full">
            <span className="text-xl">Menu</span>
            <Navigation />
          </div>
        </div>
        <div className=" w-full h-screen bg-white flex flex-col">
          <div className="w-full h-20 flex justify-between items-center px-5">
            <Search.Search1 />
            <div className="w-60 h-10 bg-black"></div>
          </div>
          <div className="w-full h-[calc(100%-5rem)] px-5 bg-main-ct ">
            <h3 className="w-full h-10  px-5 font-bold text-2xl">{taitle}</h3>
            <div
              className={`w-full  h-[calc(100%-2.5rem)] rounded-t-xl ${classname}  overflow-hidden overflow-y-scroll`}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
