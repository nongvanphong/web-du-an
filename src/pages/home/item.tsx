export const Item = () => {
  return (
    <div className="h-64 bg-orage-100-ct rounded-3xl p-5 cursor-pointer">
      <div className="text-4xl text-white">
        Tên quán : <span className="font-bold">Quán gà cháy</span>
      </div>
      <div className="text-2xl text-white">
        Hoạt động : <span className=" text-green-700 font-bold">5h30</span> -{" "}
        <span className=" text-red-700 font-bold">12h30</span>
      </div>
      <div className="text-2xl text-white">Liên hệ : 0977777777</div>
      <div className="text-2xl text-white">
        Tình trạng: <span className=" text-green-700 font-bold">Hoạt động</span>
      </div>
    </div>
  );
};
