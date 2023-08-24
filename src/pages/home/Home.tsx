import { ItemAdd } from "../../component/item/ItemAdd";
import { Item } from "./item";
import Navigation from "./../../component/navigation/navigation";
import { useNavigate, useNavigation } from "react-router-dom";
import path from "../../utils/path/path";
import { useContext, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { AppContext } from "../../App";
import { storeFetch } from "../../fetchs/store/store";
import { boolean } from "yup";
import { Store } from "../../utils/types/store.types";
import { ErrorResponse } from "../../utils/types/status.typer";
import { Console } from "console";
export const Home = () => {
  const array = [1, 2, 3, 2, 3, 3, 3, 3, 4, 4];
  const navigate = useNavigate();
  const appContext = useContext(AppContext);

  const [isLoadingdata, setLoadingData] = useState<boolean>(true);

  const { data, isLoading, error } = useQuery({
    queryKey: ["store"],
    queryFn: () => storeFetch.getAllStore(),
    keepPreviousData: true,
    retry: 0,
    cacheTime: 10000,
  });

  useEffect(() => {
    console.log(data);
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

  const hanleClick = () => {
    window.location.href = path.registerSrore;
  };
  return (
    <div className="w-full h-screen bg-ct-orange p-ct-50 ">
      <div className="hidden-scroll-a  w-full h-full bg-ct-white flex rounded-3xl  p-12 overflow-x-hidden overflow-y-scroll">
        {isLoadingdata ? (
          <div>load....</div>
        ) : (
          <div className="grid grid-cols-3  gap-10 w-full">
            {data && data.data.map((i: Store) => <Item key={i.id} store={i} />)}
            <div className="h-64 cursor-pointer ">
              <ItemAdd handleClick={hanleClick} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
