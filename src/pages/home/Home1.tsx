import { ItemAdd } from "../../component/item/ItemAdd";
import { Item } from "./item";
import Navigation from "../../component/navigation/navigation";
import { useNavigate, useNavigation } from "react-router-dom";
import path from "../../utils/path/path";
import { useContext, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { AppContext } from "../../App";

import { boolean } from "yup";
import { Store } from "../../utils/types/store.types";
import { ErrorResponse } from "../../utils/types/status.typer";
import test from "../../assets/image/drink.png";
import ItemStore from "../../component/item/itemStore";
export const Home1 = () => {
  const array = [1, 2, 3, 2, 3, 3, 3, 3, 4, 4];
  const navigate = useNavigate();
  const appContext = useContext(AppContext);

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

  // const hanleClick = () => {
  //   if (!data) return;
  //   if (data.count < 5) {
  //     return (window.location.href = path.registerSrore);
  //   }
  // };
  return (
    <div className="w-full h-screen bg-ct-orange p-ct-50 ">
      {/* <div className="hidden-scroll-a  w-full h-full bg-ct-white flex rounded-3xl  p-12 overflow-x-hidden overflow-y-scroll">
        <div className="w-full ">
          {!isLoadingdata && (
            <div>
              {data.count < 5 ? (
                <div className="flex items-center justify-between pb-4 bg-white dark:bg-gray-900">
                  <div>
                    <button
                      id="dropdownActionButton"
                      data-dropdown-toggle="dropdownAction"
                      className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                      onClick={hanleClick}
                    >
                      <span className="sr-only">Thêm cửa hàng</span>
                      Thêm cửa hàng
                    </button>
                    {/* Dropdown menu */}
      {/* </div>
                </div>
              ) : null}
            </div>
          )}
          <div className="text-orange-600">
            <i>Mỗi user chỉ được đăng kí tôi da 5 cửa hàng</i>
          </div>
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="p-4">
                  #
                </th>
                <th scope="col" className="px-6 py-3">
                  Cửa hàng
                </th>
                <th scope="col" className="px-6 py-3">
                  Địa chỉ
                </th>
                <th scope="col" className="px-6 py-3">
                  Tình trạng
                </th>
                <th scope="col" className="px-6 py-3">
                  Giờ mở
                </th>
                <th scope="col" className="px-6 py-3">
                  Giờ đóng
                </th>
                <th scope="col" className="px-6 py-3">
                  Mở cửa
                </th>
              </tr>
            </thead>
            <tbody>
              {/* {isLoadingdata ? (
                <div>load....</div>
              ) : (
                data.data.map((i: Store, index: number) => (
                  <ItemStore index={index + 1} key={i.id} store={i} />
                ))
              )} */}
      {/* </tbody>
          </table>
        </div>
      </div> */}
    </div>
  );
};
