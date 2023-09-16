import { Chart } from "../../Chart";

export default function ItemPay() {
  return (
    <div className="w-full flex gap-5 ">
      <div className="w-1/2  rounded-md flex gap-5 flex-col">
        <div className="w-full h-64 bg-white rounded-md flex flex-col gap-5 justify-center items-center">
          <div className="text-lg font-bold">Tổng tiền hôm nay</div>
          <div className="w-full  flex justify-center items-center gap-9 ">
            <span className="text-3xl font-bold"> 20000 VNĐ</span>
            <span className="text-2xl font-bold">-</span>
            <span className="text-2xl font-bold"> 20 đơn</span>
          </div>
        </div>
        <div className="w-full h-64 rounded-md"></div>
      </div>
      <div className="w-1/2  rounded-md  flex gap-5 flex-col">
        <div className="w-full h-64 bg-white rounded-md">
          <Chart.Chart2 />
        </div>
        <div className="w-full h-64 bg-white rounded-md">
          <Chart.Chart2 />
        </div>
      </div>
      ;
    </div>
  );
}
