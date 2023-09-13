import error from "../../../src/assets/icon/error.png";
interface Props {
  type: React.HTMLInputTypeAttribute;
  errorMessage?: string;
  placeholder?: string;
  //img?: string
  name: string;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  value?: string;
  maxLength?: number;
  lable?: string;
}

export default function Input1(props: Props) {
  return (
    <div className="w-full">
      {props.errorMessage ? (
        <div className=" flex items-center gap-3">
          <img src={error} className="w-4 h-4" alt="" />
          <label htmlFor="" className="text-red-600">
            {props.lable}
          </label>
        </div>
      ) : (
        <div className=" flex items-center gap-3">
          <label htmlFor="">{props.lable}</label>
        </div>
      )}
      <input
        type={props.type}
        className={`border rounded-md w-full h-11 px-5 ${
          props.errorMessage ? "border-red-600" : null
        } ${props.errorMessage ? "bg-pink-100" : null}`}
        name={props.name}
        value={props.value}
        maxLength={props.maxLength}
        onChange={props.onChange}
      />
      {/* {props.errorMessage ? (
        <div className=" mb-2 flex  min-h-[1rem] items-center text-xs text-red-600">
          <span className="pl-2">{props.errorMessage}</span>
        </div>
      ) : (
        <div className="mb-4" />
      )} */}
    </div>
  );
}
