import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

const Profile = ({
  onCardLike,
  handleCardClick,
  clothingItems,
  handleAddClick,
  handleChangeProfileClick,
  handleLogOutClick,
}) => {
  return (
    <div className="profile">
      <section className="profile__sideBar">
        <SideBar
          handleChangeProfileClick={handleChangeProfileClick}
          handleLogOutClick={handleLogOutClick}
        />
      </section>
      <section className="profile__clothes">
        <ClothesSection
          onCardLike={onCardLike}
          handleAddClick={handleAddClick}
          handleCardClick={handleCardClick}
          clothingItems={clothingItems}
        />
      </section>
    </div>
  );
};

export default Profile;
