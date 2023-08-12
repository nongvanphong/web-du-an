import { useNavigate } from "react-router-dom";
export default function Register() {
  const navigate = useNavigate();
  const changePageRegister = () => {
    navigate("/auth/login");
  };
  return (
    <div>
      <div>Đăng kí</div>
      <button onClick={changePageRegister} className="bg-slate-400">
        Đăng kí
      </button>
    </div>
  );
}
