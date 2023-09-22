import instance from "../apis/instance";

const AllOder = async () => {
  const response = await instance.get("/store/oder/all");
  return response.data;
};

const AllDetail = async (id: number) => {
  const response = await instance.get("/store/oder/all/detail", {
    params: { id: id },
  });
  return response.data;
};
export const BillFetch = {
  AllOder,
  AllDetail,
};
