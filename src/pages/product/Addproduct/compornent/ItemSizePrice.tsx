import remove from "../../../../assets/icon/svg/remove.svg";

interface Data {
  index: number;
  price: number;
  size: string;
  hanleRemove: (index: number) => void;
}

export default function ItemSizePrice(props: Data) {
  const handleRemove = (index: number) => {
    return props.hanleRemove(index);
  };
  return (
    <div className="w-full h-10  flex items-center px-3  ">
      <div className="w-full h-full bg-yellow-50  pr-5 rounded-md border-2 flex items-center px-5 font-bold">
        Giá: {props.price} vnđ - Size: {props.size}
      </div>
      <div className="w-9 h-9 cursor-pointer ml-3 flex items-center justify-center rounded-md bg-red-80-ct">
        <img
          src={remove}
          alt="remove"
          className="w-6 h-6 "
          onClick={() => handleRemove(props.index)}
        />
      </div>
    </div>
  );
}
