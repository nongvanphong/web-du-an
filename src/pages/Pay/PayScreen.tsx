import { Chart } from "../Chart";
import { Item } from "./compornent";

export default function PayScreen() {
  return (
    <div className="w-full flex flex-col gap-5">
      <Item.ItemPay />
      <div className="px-5 font-bold text-2xl">Biểu đồ</div>
      <Chart.Chart1 />
      {/* <div className="px-5 font-bold text-2xl">Hóa đơn</div>
      <Item.Bill /> */}
    </div>
  );
}
