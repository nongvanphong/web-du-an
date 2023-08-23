import trasua from "../../assets/image/ts.png";
export default function ItemProduct() {
  return (
    <div className="w-full h-64 rounded-2xl bg-white overflow-hidden">
      <img src={trasua} alt="drink" className="w-full h-44 " />
      <div className="px-3">
        <div>Trà sữa chuyền thống</div>
        <div>Giá : 20.000 vnđ</div>
        <div>Size : X</div>
      </div>
    </div>
  );
}
