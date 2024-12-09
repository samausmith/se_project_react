import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import { useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { getCoordinates, APIkey } from "../../utils/constants";
import Footer from "../Footer/Footer";

function App() {
  const [radioSelected, setRadioSelected] = useState("");
  const [coordinates, setCoordinates] = useState({
    latitude: "",
    longitude: "",
  });
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});

  const handleOverlayClose = (evt) => {
    if (evt.target.classList.contains("modal_open")) {
      closeModal();
    }
  };

  const handleRadioBtn = (evt) => {
    setRadioSelected(evt.target.id);
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };
  const handleAddClick = () => {
    console.log("button clicked");
    setActiveModal("add-garment");
  };

  const closeModal = () => {
    setActiveModal("");
  };
  debugger;

  useEffect(() => {
    getCoordinates()
      .then((data) => {
        // setCoordinates({ latitude: data.latitude, longitude: data.longitude });
        return getWeather(
          { latitude: data.latitude, longitude: data.longitude },
          APIkey
        );
      })
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  //useEffect(() => {
  // getWeather(coordinates, APIkey)
  //   .then((data) => {
  //   const filteredData = filterWeatherData(data);
  //   setWeatherData(filteredData);
  //})
  // .catch(console.error);
  //}, [coordinates]);

  return (
    <div className="page">
      <div className="page__content">
        <Header handleAddClick={handleAddClick} weatherData={weatherData} />
        <Main weatherData={weatherData} handleCardClick={handleCardClick} />
      </div>
      <ModalWithForm
        buttonText="Add garment"
        title="New garment"
        activeModal={activeModal}
        closeModal={closeModal}
        handleOverlayClose={handleOverlayClose}
      >
        <label htmlFor="name" className="modal__label">
          Name{" "}
          <input
            id="name"
            type="text"
            placeholder="Name"
            className="modal__input"
          />
        </label>
        <label htmlFor="imgUrl" className="modal__label">
          Image{" "}
          <input
            id="imgUrl"
            type="url"
            placeholder="Image URL"
            className="modal__input"
          />
        </label>
        <fieldset className="modal__radio-btns">
          <legend className="modal__legend">Select the weather type:</legend>
          <label htmlFor="hot" className="modal__label modal__label_type_radio">
            <input
              id="hot"
              type="radio"
              className="modal__radio-input"
              onChange={handleRadioBtn}
              disabled={radioSelected && radioSelected !== "hot"}
            />{" "}
            Hot
          </label>
          <label
            htmlFor="warm"
            className="modal__label modal__label_type_radio"
          >
            <input
              id="warm"
              type="radio"
              className="modal__radio-input"
              onChange={handleRadioBtn}
              disabled={radioSelected && radioSelected !== "warm"}
            />{" "}
            Warm
          </label>
          <label
            htmlFor="cold"
            className="modal__label modal__label_type_radio"
          >
            <input
              id="cold"
              type="radio"
              className="modal__radio-input"
              onChange={handleRadioBtn}
              disabled={radioSelected && radioSelected !== "cold"}
            />{" "}
            Cold
          </label>
        </fieldset>
      </ModalWithForm>
      <ItemModal
        activeModal={activeModal}
        card={selectedCard}
        closeModal={closeModal}
        handleOverlayClose={handleOverlayClose}
      />
      <Footer />
    </div>
  );
}

export default App;
