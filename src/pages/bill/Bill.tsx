import { Index } from "./compornent";
import NextPage from "./../../component/Nextpage/NextPage";
import { useState } from "react";

export default function Bill() {
  const array = [1, 2, 3, 2, 3, 3, 3, 3, 4, 4];
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleAcctive = () => {
    setIsOpen(true);
  };
  const handleClodeModa = () => {
    setIsOpen(false);
  };
  return (
    <div className="w-full">
      <Index.Bill_detail isOpen={isOpen} hanldeClode={handleClodeModa} />

      {/* component */}
      <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
        <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                  Họ và tên
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                  Số điện thoại
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                  Đơn mua
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                  Tổng tiền
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                  Ngày mua
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                  Ngày xuất bill
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300" />
              </tr>
            </thead>
            <tbody className="bg-white">
              {array.map((item: number, index: number) => (
                <Index.Item hanldeOpen={handleAcctive} />
              ))}
            </tbody>
          </table>
          <NextPage />
        </div>
      </div>
    </div>
  );
}