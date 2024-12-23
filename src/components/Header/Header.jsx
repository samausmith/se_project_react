import "./Header.css";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="logo" className="header__logo" />
      </Link>

      <p className="header__date-location">
        {currentDate}, {weatherData.city}
      </p>
      <div className="header__buttons">
        <ToggleSwitch />
        <button
          onClick={handleAddClick}
          type="button"
          className="header__add-clothes-btn"
        >
          + Add clothes
        </button>
      </div>

      <Link to="/profile" className="header__link">
        <div className="header__user-container">
          <p className="header__username">Peter Parker</p>
          <img src={avatar} alt="Peter Parker" className="header__avatar" />
        </div>
      </Link>
    </header>
  );
}

export default Header;
