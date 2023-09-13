import { useNavigate } from "react-router-dom";
import path from "../../utils/path/path";

interface Typedata {
  taitle: string;
  bg_color: string;
  text_color: string;
  keys: string;
  handlClick?: () => void;
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
    }
  };
  return (
    <div
      className={`w-full h-14  rounded-full ${props.bg_color} flex justify-center items-center cursor-pointer border border-black`}
      onClick={hanldeClick}
    >
      <span className={`text-2xl ${props.text_color}`}> {props.taitle}</span>
    </div>
  );
}
