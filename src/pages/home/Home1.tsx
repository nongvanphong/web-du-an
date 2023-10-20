import { ItemAdd } from "../../component/item/ItemAdd";
import { Item } from "./compornent/item";
import Navigation from "../../component/navigation/navigation";
import { useNavigate, useNavigation } from "react-router-dom";
import path from "../../utils/path/path";
import { useContext, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { AppContext } from "../../App";

import { ErrorResponse } from "../../utils/types/status.typer";
import { Index } from "./compornent";

export const Home1 = () => {
  const array = [1, 2, 3, 2, 3, 3, 3, 3];
  const navigate = useNavigate();
  const appContext = useContext(AppContext);
  const [activeItemIndex, setActiveItemIndex] = useState<number>(-1);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoadingdata, setLoadingData] = useState<boolean>(true);

  const { data, isLoading, error } = useQuery({
    queryKey: ["store"],
    queryFn: () => "storeFetch.getAllStore()",
    keepPreviousData: true,
    retry: 0,
    cacheTime: 10000,
  });

  useEffect(() => {
    setLoadingData(isLoading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  if (error) {
    const myError: ErrorResponse<typeof error> = error as any;
    if (myError.response.status == 403) {
      // console.log("không đủ quyềnd");
      window.location.href = path.premissions;
    }
  }
  const handleAcctive = (index: number) => {
    setIsOpen(true);
    setActiveItemIndex(index);
  };
  const handleClodeModa = () => {
    setIsOpen(false);
  };
  return (
    <div className="w-full h-screen bg-white ">
      <Index.ModalHome isOpen={isOpen} hanldeClode={handleClodeModa} />
      <table className="min-w-max w-full table-auto ">
        <thead className="sticky top-0 bg-gray-200 z-10 text-gray-600 uppercase text-sm leading-normal">
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">#</th>
            <th className="py-3 px-6 text-left">Người mua</th>
            <th className="py-3 px-6 text-left">Tổng tiền</th>
            <th className="py-3 px-6 text-center">Số đơn</th>
            <th className="py-3 px-6 text-center">Giờ đặt</th>
            <th className="py-3 px-6 text-center">Tình trạng</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light ">
          {array.map((item: number, index: number) => (
            <Index.Item
              index={index}
              handleAcctive={handleAcctive}
              activeItemIndex={activeItemIndex}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
