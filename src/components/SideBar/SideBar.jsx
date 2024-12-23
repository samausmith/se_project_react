import "./SideBar.css";
import avatar from "../../assets/avatar.svg";

const SideBar = () => {
  return (
    <div className="sideBar">
      <img className="sideBar__avatar" src={avatar} alt="User Avatar" />
      <p className="sideBar__username">Peter Parker</p>
    </div>
  );
};

export default SideBar;
