import React, {useState} from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({});

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
  }

  function handleCardClick(card) {
    setIsImagePopupOpen(true)
    setSelectedCard(card);
  }

  return (
    <>
      <Header />
      <Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
      />
      <Footer />
      {/* вызов попап редактирования аватар */}
      <PopupWithForm
        isOpen={isEditAvatarPopupOpen}
        title="Обновить аватар"
        name="avatar"
        onClose={closeAllPopups}
      >
        <input
          id="input-avatar"
          className="popup__input popup__input_avatar"
          type="url"
          name="avatar"
          placeholder="Ссылка на аватар"
          required
        />
        <span id="input-avatar-error" className="popup__error" />
      </PopupWithForm>
      {/* вызов попапа редактирования профиля */}
      <PopupWithForm
        isOpen={isEditProfilePopupOpen}
        title="Редактировать профиль"
        name="profile"
        onClose={closeAllPopups}
      >
        <input
          id="input-name"
          className="popup__input popup__input_name"
          type="text"
          name="name"
          placeholder="Введите Ваше Имя"
          required
          minLength={2}
          maxLength={40}
        />
        <span id="input-name-error" className="popup__error" />
        <input
          id="input-descr"
          className="popup__input popup__input_description"
          type="text"
          name="about"
          placeholder="О себе"
          required
          minLength={2}
          maxLength={200}
        />
        <span id="input-descr-error" className="popup__error" />
      </PopupWithForm>
      {/* вызов попапа добавления карточки */}
      <PopupWithForm
        isOpen={isAddPlacePopupOpen}
        title="Новое место"
        name="gallery"
        onClose={closeAllPopups}
      >
        <input
          id="input-img-name"
          className="popup__input popup__input_header"
          type="text"
          name="name"
          placeholder="Имя картинки"
          required
          minLength={2}
          maxLength={30}
        />
        <span id="input-img-name-error" className="popup__error" />
        <input
          id="input-img-url"
          className="popup__input popup__input_link"
          type="url"
          name="link"
          placeholder="Ссылка на картинку"
          required
        />
        <span id="input-img-url-error" className="popup__error" />
      </PopupWithForm>
      {/* вызов попапа отображения картинки на весь экран */}
      <ImagePopup isOpen={isImagePopupOpen} card={selectedCard} onClose={closeAllPopups} />;
    </>
  );
}

export default App;
