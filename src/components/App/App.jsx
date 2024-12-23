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
import { getItems, addItem, deleteItem } from "../../utils/api";
import DeleteModal from "../DeleteModal/DeleteModal";

function App() {
  // const [isDbChanged, setIsDbChanged] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const onAddItem = (values) => {
    addItem(values)
      .then((newItem) => {
        setClothingItems((items) => [...items, newItem]);
      })
      .then(closeModal())
      .catch(console.error);
  };

  const handleToggleSwitchChange = () => {
    currentTempUnit === "F" ? setCurrentTempUnit("C") : setCurrentTempUnit("F");
  };

  const handleOverlayClose = (evt) => {
    if (evt.target.classList.contains("modal_open")) {
      closeModal();
    }
  };

  const handleDeleteItem = (card) => {
    deleteItem(card._id)
      .then(() => {
        setClothingItems((items) =>
          items.filter((item) => item._id !== card._id)
        );
      })
      .then(closeModal())
      .catch(console.error);
  };

  const handleDeleteBtnClick = () => {
    setActiveModal("delete-modal");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };
  const handleAddClick = () => {
    setActiveModal("add-garment");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setActiveModal("");
    setIsModalOpen(false);
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
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  handleAddClick={handleAddClick}
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
          isModalOpen={isModalOpen}
        />
        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          closeModal={closeModal}
          handleOverlayClose={handleOverlayClose}
          handleDeleteBtnClick={handleDeleteBtnClick}
        />
        <DeleteModal
          activeModal={activeModal}
          card={selectedCard}
          closeModal={closeModal}
          handleOverlayClose={handleOverlayClose}
          handleDeleteItem={handleDeleteItem}
        />
        <Footer />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
