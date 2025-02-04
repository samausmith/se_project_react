import "./ClothesSection.css";
import { useContext } from "react";
import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const ClothesSection = ({ handleCardClick, clothingItems, handleAddClick }) => {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <div className="clothesSection">
      <div className="clothesSection__header">
        <p className="clothesSection__text">Your items</p>
        <button onClick={handleAddClick} className="clothesSection__btn">
          + Add new
        </button>
      </div>
      <ul className="clothesSection__cards-list">
        {clothingItems.map((card) => {
          const isOwn = card.owner === currentUser._id;
          return (
            isOwn && (
              <ItemCard
                key={card._id}
                card={card}
                handleCardClick={handleCardClick}
              />
            )
          );
        })}
      </ul>
    </div>
  );
};

export default ClothesSection;
