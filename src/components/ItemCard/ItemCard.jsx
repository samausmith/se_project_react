import "./ItemCard.css";

function ItemCard({ card, handleCardClick }) {
  const handleOnClick = () => {
    handleCardClick(card);
  };
  return (
    <li className="card">
      <h2 className="card__name">{card.name}</h2>
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
