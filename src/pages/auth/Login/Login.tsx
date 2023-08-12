import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const changePageRegister = () => {
    navigate("/auth/register");
  };
  return (
    <div>
      <div>đăng nhập</div>
      <button onClick={changePageRegister} className="bg-slate-400">
        đăbng mhaapj
      </button>
    </div>
  );
};

export default Login;
