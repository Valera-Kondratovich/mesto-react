import React, { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import CardImageDeletePopup from "./CardImageDeletePopup";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isCardImageDeletePopup, setIsCardImageDeletePopup] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [cardDelete, setCardsDelete] = useState({});

  useEffect(() => {
    api.getUserData().then((dataUser) => {
      setCurrentUser(dataUser);
    })
    .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    api.getAllCardsData().then((data) => {
      setCards(data);
    })
    .catch((err) => console.log(err));
  }, []);

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
    setIsCardImageDeletePopup(false);
  }

  function handleCardClick(card) {
    setIsImagePopupOpen(true);
    setSelectedCard(card);
  }
  // функция добавления удаления лайков
  function handleCardLike(card) {
    //проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((cards) => cards.map((c) => (c._id === card._id ? newCard : c)));
    })
    .catch((err) => console.log(err));
  }

  function handelCardImageDeletClick(card) {
    setIsCardImageDeletePopup(true);
    setCardsDelete(card);
  }

  function handleCardDeleteSumbit(e) {
    e.preventDefault();
    handleCardDelete(cardDelete);
  }

  function handleCardDelete(card) {
    api.delCard(card._id).then(() => {
      setCards((cards) => cards.filter((c) => c._id !== card._id));
      closeAllPopups();
      setCardsDelete({});
    })
    .catch((err) => console.log(err));
  }

  function handleUpdateUser(updateDataUser) {
    api.patchUserData(updateDataUser).then((updateDataUser) => {
      setCurrentUser(updateDataUser);
      closeAllPopups();
    })
    .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(updateAvatar) {
    api.patchUserAvatar(updateAvatar).then((updateAvatar) => {
      setCurrentUser(updateAvatar);
      closeAllPopups();
    })
    .catch((err) => console.log(err));
  }

  function handleAddPlace(newPlace) {
    api.postCardData(newPlace).then((newPlace) => {
      setCards([newPlace, ...cards]);
      closeAllPopups();
    })
    .catch((err) => console.log(err));

  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          onCardDeleteClick={handelCardImageDeletClick}
          onCardLike={handleCardLike}
          cards={cards}
        />
        <Footer />
        {/* вызов попап редактирования аватар */}
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        {/* вызов попапа редактирования профиля */}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        {/* вызов попапа добавления карточки */}
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
        />
        {/* вызов попапа отображения картинки на весь экран */}
        <ImagePopup
          isOpen={isImagePopupOpen}
          card={selectedCard}
          onClose={closeAllPopups}
        />
        <CardImageDeletePopup
          isOpen={isCardImageDeletePopup}
          onClose={closeAllPopups}
          title="Вы уверены?"
          name="trash"
          onSubmit={handleCardDeleteSumbit}
        />
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
