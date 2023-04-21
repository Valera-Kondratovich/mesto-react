import React from "react";

function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  }

  return (
    <div className="elements__element">
      <img
        className="elements__img"
        src={`${props.card.link}`}
        alt={`${props.card.title}`}
        onClick={handleClick}
      />
      <div className="elements__group">
        <h2 className="elements__title">{props.card.title}</h2>
        <div className="elements__wrap">
          <button className="elements__button-like" type="button" />
          <span className="elements__count">{props.card.likes}</span>
        </div>
      </div>
      <button className="elements__button-trash" type="button" />
    </div>
  );
}

export default Card;
