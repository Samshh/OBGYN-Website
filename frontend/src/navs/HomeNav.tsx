import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function HomeNav() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  const handleLoginClick = () => {
    navigate("/login");
    setIsLogin(true);
    setIsRegister(false);
  };

  const handleRegisterClick = () => {
    navigate("/register");
    setIsRegister(true);
    setIsLogin(false);
  };

  return (
    <nav id="navHome">
      <div id="nav">
        <img
          onClick={() => (
            navigate("/"), setIsLogin(false), setIsRegister(false)
          )}
          className="h-[44px] md:h-[55px] hover:cursor-pointer hover:scale-110 transition-transform duration-200 ease-in-out"
          src="logo.svg"
          alt=""
        />
        <div className="flex gap-[1rem]">
          <button disabled={isLogin} onClick={handleLoginClick}>
            Login
          </button>
          <button disabled={isRegister} onClick={handleRegisterClick}>
            Register
          </button>
        </div>
      </div>
    </nav>
  );
}
