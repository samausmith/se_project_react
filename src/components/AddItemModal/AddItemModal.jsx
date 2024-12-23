import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect } from "react";

const AddItemModal = ({
  activeModal,
  closeModal,
  handleOverlayClose,
  onAddItem,
}) => {
  // declare state for each input field
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [weatherInput, setWeatherInput] = useState("");

  // use a useEffect hook to reset the input field state to empty strings when
  // the modal is opened

  // create onChange handlers corresponding to each state variable
  const handleNameChange = (evt) => {
    setName(evt.target.value);
  };

  const handleUrlChange = (evt) => {
    setUrl(evt.target.value);
  };

  const handleWeatherInputChange = (evt) => {
    setWeatherInput(evt.target.value);
  };

  function handleSubmit(e) {
    // prevent default behavior
    evt.preventDefault();
    // call onAddItem with appropriate arguments
    onAddItem({ name, url });
    closeModal;
  }

  return (
    <ModalWithForm
      buttonText="Add garment"
      title="New garment"
      activeModal={activeModal}
      closeModal={closeModal}
      handleOverlayClose={handleOverlayClose}
      isOpen={activeModal === "add-garment"}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          id="name"
          type="text"
          placeholder="Name"
          className="modal__input"
          value={name}
          onChange={handleNameChange}
          required
        />
      </label>
      <label htmlFor="imgUrl" className="modal__label">
        Image{" "}
        <input
          id="imgUrl"
          type="url"
          placeholder="Image URL"
          className="modal__input"
          onChange={handleUrlChange}
          required
        />
      </label>
      <fieldset className="modal__radio-btns">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            name="weather-type"
            id="hot"
            type="radio"
            className="modal__radio-input"
            onChange={handleWeatherInputChange}
          />{" "}
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            name="weather-type"
            id="warm"
            type="radio"
            className="modal__radio-input"
            onChange={handleWeatherInputChange}
          />{" "}
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            name="weather-type"
            id="cold"
            type="radio"
            className="modal__radio-input"
            onChange={handleWeatherInputChange}
          />{" "}
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
