import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function HomeNav() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  useEffect(() => {
    const savedIsLogin = localStorage.getItem("isLogin") === "true";
    const savedIsRegister = localStorage.getItem("isRegister") === "true";
    setIsLogin(savedIsLogin);
    setIsRegister(savedIsRegister);
  }, []);

  const handleLoginClick = () => {
    navigate("/login");
    setIsLogin(true);
    setIsRegister(false);
    localStorage.setItem("isLogin", "true");
    localStorage.setItem("isRegister", "false");
  };

  const handleRegisterClick = () => {
    navigate("/register");
    setIsRegister(true);
    setIsLogin(false);
    localStorage.setItem("isRegister", "true");
    localStorage.setItem("isLogin", "false");
  };

  const handleLogoClick = () => {
    navigate("/");
    setIsLogin(false);
    setIsRegister(false);
    localStorage.setItem("isLogin", "false");
    localStorage.setItem("isRegister", "false");
  };

  return (
    <nav id="navHome">
      <div id="nav">
        <img
          onClick={handleLogoClick}
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