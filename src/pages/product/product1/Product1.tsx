import { ButtonCustom } from "../../../component/ButtonCustom";
import { Search } from "../../../component/search";
import seach from "../../../assets/icon/svg/search.svg";
const fechData = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 23, 45, 25, 67, 76, 43, 21,
];

export default function Product1() {
  return (
    <div className=" w-full ">
      <div className="w-full h-12  flex justify-between items-center">
        <Search.Search1 />
        <div className="w-60">
          <ButtonCustom.ButtonAddproduct />
        </div>
      </div>
      <table className="min-w-max w-full table-auto ">
        <thead className="sticky top-0 bg-gray-200 z-10 text-gray-600 uppercase text-sm leading-normal">
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">#</th>
            <th className="py-3 px-6 text-left">#</th>
            <th className="py-3 px-6 text-left">Tên</th>
            <th className="py-3 px-6 text-center">Giá</th>
            <th className="py-3 px-6 text-center">Size</th>
            <th className="py-3 px-6 text-center">Actions</th>
            <th className="py-3 px-6 text-center">Edit</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light ">
          {fechData.map((index) => (
            <tr className="border-b border-gray-200 hover:bg-yellow-50">
              <td className="py-3 px-6 text-left whitespace-nowrap">
                <div>{index}</div>
              </td>
              <td className="py-3 px-6 text-left whitespace-nowrap">
                <div className="flex items-center">
                  <div className="mr-2">
                    <img
                      className="w-10 h-10 rounded-full border-gray-200 border transform hover:scale-125"
                      src={seach}
                    />
                  </div>
                </div>
              </td>
              <td className="py-3 px-6 text-left">
                <div className="flex items-center">
                  <div className="mr-2">
                    <span className="font-medium">dsf</span>
                  </div>
                </div>
              </td>
              <td className="py-3 px-6 text-center">sd</td>
              <td className="py-3 px-6 text-center">
                <div className="flex flex-col items-center justify-center">
                  d
                </div>
              </td>
              <td className="py-3 px-6 text-center">d</td>
              <td className="py-3 px-6 text-center">
                <div className="flex item-center justify-center">
                  <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110 cursor-pointer ">
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
          ))}
        </tbody>
      </table>
    </div>
  );
}
