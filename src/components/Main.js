import React from "react";
import api from "../utils/api";
import Card from "./Card";

function Main(props) {
  const [userAvatar, setUserAvatar] = React.useState();
  const [userName, setUserName] = React.useState();
  const [userDescription, setUserDescription] = React.useState();
  const [cards, setCards] = React.useState([]);
  React.useEffect(() => {
    api.getAllCardsData().then((data) => {
      setCards(
        data.map((item) => ({
          id: item._id,
          title: item.name,
          link: item.link,
          likes: item.likes.length,
        }))
      );
    });
  }, []);
  React.useEffect(() => {
    api.getUserData().then((data) => {
      setUserAvatar(data.avatar);
      setUserName(data.name);
      setUserDescription(data.about);
    });
  }, [userName, userDescription, userAvatar]);
  return (
    <>
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
              <Card key={item.id} card={item} onCardClick={props.onCardClick} />
            );
          })}
        </section>
      </main>
    </>
  );
}

export default Main;
