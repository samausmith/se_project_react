import "./ItemCard.css";
import likeBtn from "../../assets/like-btn.svg";

function ItemCard({ card, handleCardClick, onCardLike }) {
  const handleOnClick = () => {
    handleCardClick(card);
  };

  const handleLike = () => {
    onCardLike(card);
  };

  // const isLiked = item.likes.some((id) => id === currentUser._id);

  // const itemLikeButtonClassName = `card__like-btn ${
  //   isLiked ? "" : "card__like-btn_hidden"
  // }`;

  return (
    <li className="card">
      <div className="card__header">
        <h2 className="card__name">{card.name}</h2>
        <img src={likeBtn} alt="like button" className="card__like-btn" />
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
