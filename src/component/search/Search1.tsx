import seach from "../../assets/icon/svg/search.svg";

export default function Search1() {
  return (
    <div className="w-96 flex items-center border border-black  rounded-md  h-11 px-5 bg-white">
      <img src={seach} className=" h-8 w-8"></img>
      <input
        placeholder="Nhập nội dung cần tìm"
        type="text"
        className={`pl-3 w-full h-full border-none outline-none`}
      />
    </div>
  );
}
