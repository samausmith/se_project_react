import "./ItemCard.css";
import { useContext } from "react";
import likeBtn from "../../assets/like-btn.svg";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ card, handleCardClick, onCardLike }) {
  const { currentUser } = useContext(CurrentUserContext);

  const handleOnClick = () => {
    handleCardClick(card);
  };

  const handleLike = () => {
    onCardLike(card, isLiked);
  };

  const isLiked = card.likes.some((id) => id === currentUser._id);

  const itemLikeButtonClassName = `card__like-btn ${
    isLiked ? "card__like-btn_liked" : "card__like-btn_hidden"
  }`;

  return (
    <li className="card">
      <div className="card__header">
        <h2 className="card__name">{card.name}</h2>
        <img
          src={likeBtn}
          onClick={handleLike}
          alt="like button"
          className={itemLikeButtonClassName}
        />
      </div>
      <img
        onClick={handleOnClick}
        className="card__img"
        src={card.imageUrl}
        alt={card.name}
      />
    </li>
  );
}

export default ItemCard;
