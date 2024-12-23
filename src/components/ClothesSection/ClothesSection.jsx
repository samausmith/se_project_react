import "./ClothesSection.css";
import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";

const ClothesSection = ({ handleCardClick, clothingItems, handleAddClick }) => {
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
          return (
            <ItemCard
              key={card._id}
              card={card}
              handleCardClick={handleCardClick}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default ClothesSection;
