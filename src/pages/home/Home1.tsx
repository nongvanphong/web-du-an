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
import { BillFetch } from "../../fetchs/bill.fetch";
import { Bill } from "../../utils/types/bill.types";
import { BillDetail } from "../../utils/types/billdetail.types";

type modalhome = {
  id: number;
  user_id?: number;
  img?: string;
  phone?: string;
  address?: string;
  user_name?: string;
  detail: BillDetail;
};

export const Home1 = () => {
  const navigate = useNavigate();
  const appContext = useContext(AppContext);
  const [activeItemIndex, setActiveItemIndex] = useState<number>(-1);

  const [isOpen, setIsOpen] = useState(false);
  const [isLoadingdata, setLoadingData] = useState<boolean>(true);
  const [modals, setModals] = useState<modalhome>();
  const [fechData, setFechData] = useState<Bill[]>();
  const { data, isLoading, error } = useQuery({
    queryKey: ["oder"],
    queryFn: () => BillFetch.AllOder(),
    keepPreviousData: true,
    retry: 1,
    cacheTime: 10000,
  });

  useEffect(() => {
    if (isLoading) return;
    setFechData(data.data);
  }, [data]);

  if (error) {
    const myError: ErrorResponse<typeof error> = error as any;
    if (myError.response.status == 403) {
      // console.log("không đủ quyềnd");
      window.location.href = path.premissions;
    }
  }

  const handleAcctive = (
    index: number,
    id: number,
    user_id: number,
    img?: string,
    phone?: string,
    address?: string,
    user_name?: string,
    detail?: BillDetail
  ) => {
    setIsOpen(true);
    setActiveItemIndex(index);
    //console.log(id, img, phone, address);
    if (detail)
      setModals({ id, user_id, img, phone, address, user_name, detail });
  };
  const handleClodeModa = () => {
    setIsOpen(false);
  };
  return (
    <div className="w-full h-screen bg-white ">
      <Index.ModalHome
        isOpen={isOpen}
        hanldeClode={handleClodeModa}
        modalhome={modals}
      />
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
          {fechData &&
            fechData.map((item: Bill, index: number) => (
              <Index.Item
                id={item.id}
                user_id={item.user_id}
                index={index}
                handleAcctive={handleAcctive}
                activeItemIndex={activeItemIndex}
                phone={item.User?.phone}
                user_name={item.User?.user_name}
                total_amount={item.total_amount}
                createdAt={item.createdAt}
                img={item.User?.image}
                address={item.User?.address}
                product={item.Billdetails}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
};
