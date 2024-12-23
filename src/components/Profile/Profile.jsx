import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

const Profile = ({ handleCardClick, clothingItems, handleAddClick }) => {
  return (
    <div className="profile">
      <section className="profile__sideBar">
        <SideBar />
      </section>
      <section className="profile__clothes">
        <ClothesSection
          handleAddClick={handleAddClick}
          handleCardClick={handleCardClick}
          clothingItems={clothingItems}
        />
      </section>
    </div>
  );
};

export default Profile;
