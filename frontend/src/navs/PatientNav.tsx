import { Icon } from "@iconify/react";

export default function PatientNav() {
  return (
    <nav className="innerNav">
      <div id="innerNavContainer">
        <button className="innerNavButton" title="home">
          <Icon className="Icon" icon="heroicons:home" />
        </button>
        <button className="innerNavButton" title="home">
          <Icon className="Icon" icon="heroicons:clipboard" />
        </button>
        <button className="innerNavButton" title="home">
          <Icon
            className="Icon"
            icon="heroicons:arrow-right-on-rectangle-solid"
          />
        </button>
      </div>
    </nav>
  );
}
