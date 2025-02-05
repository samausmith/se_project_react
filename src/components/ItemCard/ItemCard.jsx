import "./ItemCard.css";
import likeBtn from "../../assets/like-btn.svg";

function ItemCard({ card, handleCardClick, onCardLike }) {
  const handleOnClick = () => {
    handleCardClick(card);
  };

  const handleLike = () => {
    onCardLike(card, isLiked);
  };

  const isLiked = card.likes.some((id) => id._id === currentUser._id);

  const itemLikeButtonClassName = `card__like-btn ${
    isLiked ? "" : "card__like-btn_hidden"
  }`;

  return (
    <li className="card">
      <div className="card__header">
        <h2 className="card__name">{card.name}</h2>
        <img
          onClick={handleLike}
          src={likeBtn}
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
