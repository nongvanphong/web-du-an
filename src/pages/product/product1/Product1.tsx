import { ButtonCustom } from "../../../component/ButtonCustom";
import { Search } from "../../../component/search";
import seach from "../../../assets/icon/svg/search.svg";
import { useQuery } from "react-query";
import { ProductFetch } from "../../../fetchs/product.fetch";
import { Product } from "../../../utils/types/product.types";
import { Item } from "./conpornent";
import { useEffect, useState } from "react";

export default function Product1() {
  const [fechData, setFechData] = useState<Product[]>();
  const { data, isLoading, error } = useQuery({
    queryKey: ["product"],
    queryFn: () => ProductFetch.All(-1),
    keepPreviousData: true,
    retry: 1,
    cacheTime: 10000,
  });
  useEffect(() => {
    console.log(data, isLoading, error);
    if (isLoading) return;
    setFechData(data.data);
  }, [data]);
  const hnaldeDelete = (id: number) => {
    if (!fechData) return;
    setFechData((p) =>
      fechData.filter((product: Product) => product.id !== id)
    );
  };
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
          {fechData &&
            fechData.map((item: Product, index: number) => (
              <Item.ItemProduct
                index={index}
                product={item}
                hanldeDelete={hnaldeDelete}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
}
