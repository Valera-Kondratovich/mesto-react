import React from "react";

function ImagePopup(props) {
  return (
    <div className={`popup popup_image ${props.card[0] ? "popup_opened" : ""}`}>
      <div className="popup__wrap">
        <button
          className="popup__button-close"
          type="button"
          onClick={props.onClose}
        />
        <img
          className="popup__picture"
          src={`${props.card[1].link}`}
          alt={`${props.card[1].title}`}
        />
        <p className="popup__description">{props.card[1].title}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
