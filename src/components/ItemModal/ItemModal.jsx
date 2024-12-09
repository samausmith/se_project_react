import "./ItemModal.css";

function ItemModal({ activeModal, card, closeModal, handleOverlayClose }) {
  return (
    <div
      className={`modal ${activeModal === "preview" && "modal_open"}`}
      onMouseDown={handleOverlayClose}
    >
      <div className="modal__content modal__content_type_img">
        <button
          onClick={closeModal}
          type="button"
          className="modal__close modal__close_white"
        ></button>
        <img src={card.link} alt={card.name} className="modal__img" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;