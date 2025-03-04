import "./Header.css";
import { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({
  handleAddClick,
  weatherData,
  handleRegisterClick,
  handleLoginClick,
}) {
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);

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

      <div className="header__link">
        {isLoggedIn ? (
          <div className="header__link-container">
            <div className="header__buttons">
              <ToggleSwitch />
              <button
                onClick={handleAddClick}
                type="button"
                className="header__add-clothes-btn"
              >
                + Add clothes
              </button>
              <p className="header__username">{currentUser?.name}</p>
            </div>
            {currentUser?.avatar ? (
              <Link to="/profile">
                <img
                  src={currentUser?.avatar}
                  alt={currentUser?.name}
                  className="header__avatar"
                />
              </Link>
            ) : (
              <div className="header__avatar-placeholder">
                {currentUser?.name && currentUser.name.charAt(0)}
              </div>
            )}
          </div>
        ) : (
          <div className="header__user-container">
            <button
              onClick={handleRegisterClick}
              type="button"
              className="header__add-user-btn"
            >
              Sign Up
            </button>
            <button
              onClick={handleLoginClick}
              type="button"
              className="header__login-btn"
            >
              Log In
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
