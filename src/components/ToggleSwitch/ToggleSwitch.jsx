import "./ToggleSwitch.css";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

const ToggleSwitch = () => {
  //   const [currentTempUnit, setCurrentTempUnit] = useState("F");
  //   const handleSwitch = (evt) => {
  //     if (currentTempUnit === "C") {
  //       setCurrentTempUnit("F");
  //     } else if (currentTempUnit === "F") {
  //       setCurrentTempUnit("C");
  //     }
  //   };
  const { currentTempUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );
  return (
    <label className="toggle__switch">
      <input
        type="checkbox"
        className="toggle__switch__box"
        onChange={handleToggleSwitchChange}
      />
      <span
        className={
          currentTempUnit === "F"
            ? "toggle__switch__slider toggle__switch__slider-F"
            : "toggle__switch__slider toggle__switch__slider-C"
        }
      ></span>
      <p
        className={`toggle__switch__text-F ${
          currentTempUnit === "F" && "toggle__switch__text_active"
        }`}
      >
        F
      </p>
      <p
        className={`toggle__switch__text-C ${
          currentTempUnit === "C" && "toggle__switch__text_active"
        }`}
      >
        C
      </p>
    </label>
  );
};

export default ToggleSwitch;
