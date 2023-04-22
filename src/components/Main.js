import React, {useState, useEffect} from "react";
import api from "../utils/api";
import Card from "./Card";

function Main(props) {
  const [userAvatar, setUserAvatar] = useState("");
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [cards, setCards] = useState([]);
  useEffect(() => {
    api.getAllCardsData().then((data) => {

      setCards(
        data
      );
    });
  }, []);
  useEffect(() => {
    api.getUserData().then((data) => {
      setUserAvatar(data.avatar);
      setUserName(data.name);
      setUserDescription(data.about);
    });
  }, []);
  return (
      <main className="content">
        <section className="profile content__profile">
          <button
            className="profile__avatar-button"
            type="button"
            onClick={props.onEditAvatar}
          >
            <img className="profile__avatar" src={userAvatar} alt="аватар" />
          </button>
          <div className="profile__wrap">
            <div className="profile__info">
              <h1 className="profile__name">{userName}</h1>
              <p className="profile__description">{userDescription}</p>
            </div>
            <button
              className="profile__button-edit"
              type="button"
              onClick={props.onEditProfile}
            />
          </div>
          <button
            className="profile__button-add"
            type="button"
            onClick={props.onAddPlace}
          />
        </section>
        <section className="elements">
          {cards.map((item) => {
            return (
              <Card key={item._id} card={item} onCardClick={props.onCardClick} />
            );
          })}
        </section>
      </main>
  );
}

export default Main;
