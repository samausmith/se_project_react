import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import { useEffect, useState } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
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
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../../contexts/ProtectedRoute";
import * as auth from "../../utils/auth";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

function App() {
  //Variable declarations
  // const [isDbChanged, setIsDbChanged] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clothingItems, setClothingItems] = useState([]);
  const [currentTempUnit, setCurrentTempUnit] = useState("F");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("jwt");

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

  //Handlers
  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    // Check if this card is not currently liked
    !isLiked
      ? // if so, send a request to add the user's id to the card's likes array
        api
          // the first argument is the card's id
          .addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err))
      : // if not, send a request to remove the user's id from the card's likes array
        api
          // the first argument is the card's id
          .removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err));
  };

  const onAddItem = (values) => {
    addItem(values, token)
      .then((newItem) => {
        setClothingItems((items) => [newItem, ...items]);
      })
      .then(closeModal)
      .catch(console.error);
  };

  const handleEditProfile = ({ name, avatar }) => {
    auth.editProfile({ token, name, avatar }).catch(console.error);
  };

  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      return;
    }
    auth
      .loginUser({ email, password })
      .then((data) => {
        setCurrentUser(data);
        setIsLoggedIn(true);
        localStorage.setItem("jwt", data.token);
        closeModal();
      })
      .catch(console.error);
  };

  const handleRegistration = ({
    name,
    avatar,
    email,
    password,
    confirmPassword,
  }) => {
    if (password === confirmPassword) {
      auth
        .registerUser({ name, avatar, email, password })
        .then(() => {
          // TODO: handle succesful registration

          handleLogin({ name, password });
          closeModal();
        })
        .catch(console.error);
    }
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
    deleteItem(card._id, token)
      .then(() => {
        setClothingItems((items) =>
          items.filter((item) => item._id !== card._id)
        );
      })
      .then(closeModal)
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

  const handleRegisterClick = () => {
    setActiveModal("registration");
    setIsModalOpen(true);
  };

  const handleLoginClick = () => {
    setActiveModal("login");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setActiveModal("");
    setIsModalOpen(false);
  };
  //useEffects
  useEffect(() => {
    if (token) {
      auth
        .getToken(token)
        .then((user) => {
          setCurrentUser(user);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);

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
    <CurrentUserContext.Provider value={{ isLoggedIn, currentUser }}>
      <div className="page">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTempUnit, handleToggleSwitchChange }}
        >
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              handleRegisterClick={handleRegisterClick}
              handleLoginClick={handleLoginClick}
            />

            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile
                      handleAddClick={handleAddClick}
                      handleCardClick={handleCardClick}
                      clothingItems={clothingItems}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
          <EditProfileModal
            handleEditProfile={handleEditProfile}
            activeModal={activeModal}
            closeModal={closeModal}
            handleOverlayClose={handleOverlayClose}
            isModalOpen={isModalOpen}
          />
          <LoginModal
            handleLogin={handleLogin}
            activeModal={activeModal}
            closeModal={closeModal}
            handleOverlayClose={handleOverlayClose}
            isModalOpen={isModalOpen}
          />
          <RegisterModal
            handleRegistration={handleRegistration}
            activeModal={activeModal}
            closeModal={closeModal}
            handleOverlayClose={handleOverlayClose}
            isModalOpen={isModalOpen}
          />
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
    </CurrentUserContext.Provider>
  );
}

export default App;
