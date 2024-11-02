import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import cookies from "js-cookie";
import axios from "axios";

export default function PatientNav() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/users/logout",
        {},
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        cookies.remove("token");
        navigate("/login");
      }
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <nav className="innerNav">
      <div id="innerNavContainer">
        <button className="innerNavButton" title="home">
          <Icon className="Icon" icon="heroicons:home" />
        </button>
        <button className="innerNavButton" title="home">
          <Icon className="Icon" icon="heroicons:clipboard" />
        </button>
        <button
          onClick={() => handleLogout()}
          className="innerNavButton"
          title="home"
        >
          <Icon
            className="Icon"
            icon="heroicons:arrow-right-on-rectangle-solid"
          />
        </button>
      </div>
    </nav>
  );
}
