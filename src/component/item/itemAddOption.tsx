import remove from "../../assets/icon/svg/remove.svg";

interface Data {
  index: number;
  price: number;
  size: string;
  hanleRemove: (index: number) => void;
}

export default function ItemAddOption(props: Data) {
  const handleRemove = (index: number) => {
    return props.hanleRemove(index);
  };
  return (
    <div className="w-full h-10 bg-yellow-50 flex items-center justify-between pr-5">
      <div>
        Size {props.size} - giá {props.price} vnđ
      </div>
      <img
        src={remove}
        alt="remove"
        className="w-6 h-6 cursor-pointer"
        onClick={() => handleRemove(props.index)}
      />
    </div>
  );
}
