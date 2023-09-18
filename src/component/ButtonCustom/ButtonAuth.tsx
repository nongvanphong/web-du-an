import { useNavigate } from "react-router-dom";
import path from "../../utils/path/path";
import { boolean } from "yup";
import { className } from "@material-tailwind/react/types/components/accordion";

interface Typedata {
  taitle: string;
  bg_color: string;
  text_color: string;
  keys: string;
  handlClick?: () => void;
  isLoading?: boolean;
}
export default function ButtonAuth(props: Typedata) {
  const navigate = useNavigate();
  const hanldeClick = () => {
    switch (props.keys) {
      case "LOGINEMAIL":
        navigate(path.loginEmail);
        break;
      case "LOGINPHONE":
        navigate(path.loginPhoneNumber);
        break;
      case "LOGINM":
        if (props.handlClick) {
          props.handlClick();
        }
        break;
      case "CLICK":
        if (props.handlClick) {
          props.handlClick();
        }
        break;
    }
  };
  return (
    <button
      className={`w-full h-11 sm:h-14  rounded-full ${props.bg_color} flex justify-center items-center cursor-pointer border border-black`}
      onClick={hanldeClick}
      disabled={props.isLoading}
    >
      {props.isLoading ? (
        <div
          className={`inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] ${props.text_color}`}
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      ) : (
        <span className={`text-sm sm:text-xl lg:text-2xl ${props.text_color}`}>
          {props.taitle}
        </span>
      )}
    </button>
  );
}
