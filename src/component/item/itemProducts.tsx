import { useState } from "react";
import { useNavigate } from "react-router-dom";
import path from "../../utils/path/path";

export default function ItemProducts() {
  const navigate = useNavigate();
  const [acction, setAcction] = useState(true);
  const handleAcction = () => {
    if (acction) return setAcction(false);
    setAcction(true);
  };
  const hanldeEdit = () => {
    navigate(path.managerDrink, { state: { test: "1" } });
  };
  return (
    <tr className="border-b border-gray-200 hover:bg-yellow-50">
      <td className="py-3 px-6 text-left whitespace-nowrap">
        <div>1</div>
      </td>
      <td className="py-3 px-6 text-left whitespace-nowrap">
        <div className="flex items-center">
          <div className="mr-2">
            <img
              className="w-10 h-10 rounded-full border-gray-200 border transform hover:scale-125"
              src="https://randomuser.me/api/portraits/men/1.jpg"
            />
          </div>
        </div>
      </td>
      <td className="py-3 px-6 text-left">
        <div className="flex items-center">
          <div className="mr-2">
            <span className="font-medium">trà sữa chân châu</span>
          </div>
        </div>
      </td>
      <td className="py-3 px-6 text-center">
        <div className="flex flex-col items-center justify-center">
          <div className="font-bold">20000</div>
          <div className="font-bold">20000</div>
          <div className="font-bold">20000</div>
        </div>
      </td>
      <td className="py-3 px-6 text-center">
        <div className="flex flex-col items-center justify-center">
          <div className="font-bold">X</div>
          <div className="font-bold">M</div>
          <div className="font-bold">L</div>
        </div>
      </td>
      <td className="py-3 px-6 text-center">
        <span
          className={`  ${
            acction == true
              ? "bg-purple-200 text-purple-600"
              : "bg-orange-200 text-orange-600"
          } py-1 px-3 rounded-full text-xs cursor-pointer`}
          onClick={handleAcction}
        >
          {acction ? "Còn hàng" : "Hết hàng"}
        </span>
      </td>
      <td className="py-3 px-6 text-center">
        <div className="flex item-center justify-center">
          <div
            className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110 cursor-pointer "
            onClick={hanldeEdit}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </div>
          <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </div>
        </div>
      </td>
    </tr>
  );
}
