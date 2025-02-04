import "./EditProfileModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect } from "react";

const EditProfileModal = ({
  activeModal,
  closeModal,
  handleOverlayClose,
  onAddItem,
  isModalOpen,
}) => {
  // declare state for each input field
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  // use a useEffect hook to reset the input field state to empty strings when
  // the modal is opened
  useEffect(() => {
    setName("");
    setUrl("");
  }, [isModalOpen]);

  // create onChange handlers corresponding to each state variable
  const handleNameChange = (evt) => {
    setName(evt.target.value);
  };

  const handleUrlChange = (evt) => {
    setUrl(evt.target.value);
  };

  function handleSubmit(evt) {
    // prevent default behavior
    evt.preventDefault();
    handleEditProfile({ name, url });
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
    >
      <label htmlFor="Name" className="modal__label">
        Name{" "}
        <input
          id="edit-name"
          type="text"
          placeholder="Name"
          className="modal__input"
          value={name}
          onChange={handleNameChange}
          required
        />
      </label>
      <label htmlFor="url" className="modal__label">
        Avatar{" "}
        <input
          id="edit-url"
          type="text"
          value={url}
          placeholder="Password"
          className="modal__input"
          onChange={handleUrlChange}
          required
        />
      </label>
    </ModalWithForm>
  );
};

export default EditProfileModal;
