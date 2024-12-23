import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { getCoordinates, APIkey } from "../../utils/constants";
import Footer from "../Footer/Footer";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";
import { getItems } from "../../utils/api";

function App() {
  const [clothingItems, setClothingItems] = useState([]);
  const [currentTempUnit, setCurrentTempUnit] = useState("F");

  // const [coordinates, setCoordinates] = useState({
  //  latitude: "",
  // longitude: "",
  //});
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});

  const onAddItem = ({ values }) => {};

  const handleToggleSwitchChange = () => {
    currentTempUnit === "F" ? setCurrentTempUnit("C") : setCurrentTempUnit("F");
  };

  const handleOverlayClose = (evt) => {
    if (evt.target.classList.contains("modal_open")) {
      closeModal();
    }
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

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
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
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTempUnit, handleToggleSwitchChange }}
      >
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />

          <Routes>
            <Route
              path="/se_project_react"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/se_project_react/profile"
              element={
                <Profile
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
          </Routes>
        </div>
        <AddItemModal
          activeModal={activeModal}
          closeModal={closeModal}
          handleOverlayClose={handleOverlayClose}
          onAddItem={onAddItem}
        />
        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          closeModal={closeModal}
          handleOverlayClose={handleOverlayClose}
        />
        <Footer />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
