import "./EditProfileModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect, useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const EditProfileModal = ({
  activeModal,
  closeModal,
  handleOverlayClose,
  onAddItem,
  isModalOpen,
  handleEditProfile,
}) => {
  // declare state for each input field
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const { currentUser } = useContext(CurrentUserContext);

  // use a useEffect hook to reset the input field state to empty strings when
  // the modal is opened
  useEffect(() => {
    setName(currentUser.name);
    setAvatar(currentUser.avatar);
  }, [isModalOpen]);

  // create onChange handlers corresponding to each state variable
  const handleNameChange = (evt) => {
    setName(evt.target.value);
  };

  const handleUrlChange = (evt) => {
    setAvatar(evt.target.value);
  };

  function handleSubmit(evt) {
    // prevent default behavior
    evt.preventDefault();
    handleEditProfile({ name, avatar });
  }

  return (
    <ModalWithForm
      buttonTextA="Cancel"
      buttonText="Save Changes"
      title="Change Profile Data"
      activeModal={activeModal}
      closeModal={closeModal}
      handleOverlayClose={handleOverlayClose}
      isOpen={activeModal === "edit-profile"}
      onSubmit={handleSubmit}
      buttonClickHandler={closeModal}
    >
      <label htmlFor="Name" className="modal__label">
        Name{""}
        <input
          id="edit-name"
          type="text"
          placeholder=""
          className="modal__input"
          value={name}
          onChange={handleNameChange}
          required
        />
      </label>
      <label htmlFor="url" className="modal__label">
        Avatar{""}
        <input
          id="edit-url"
          type="text"
          value={avatar}
          placeholder=""
          className="modal__input"
          onChange={handleUrlChange}
          required
        />
      </label>
    </ModalWithForm>
  );
};

export default EditProfileModal;
