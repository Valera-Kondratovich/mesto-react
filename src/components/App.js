import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState([false, {}]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard([false, {}]);
  }

  function handleCardClick(card) {
    setSelectedCard([true, card]);
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
        <button className="popup__button-save" type="submit">
          Сохранить
        </button>
      </PopupWithForm>
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
        <button className="popup__button-save" type="submit">
          Сохранить
        </button>
      </PopupWithForm>
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
        <button className="popup__button-save" type="submit">
          Сохранить
        </button>
      </PopupWithForm>
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />;
    </>
  );
}

export default App;
