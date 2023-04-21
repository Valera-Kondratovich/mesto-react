import React from "react";

function PopupWithForm({ title, name, isOpen, onClose, children }) {
  return (
    <>
      {/* попап редактирования информации о профиле */}
      <div className={`popup popup_${name} ${isOpen ? "popup_opened" : ""}`}>
        <div className="popup__body">
          <div className="popup__content">
            <form
              className={`popup__form popup__${name}`}
              name={name}
              noValidate
            >
              <h2 className="popup__title">{title}</h2>
              {children}
              <button
                className="popup__button-close"
                type="button"
                onClick={onClose}
              />
            </form>
          </div>
        </div>
      </div>
      {/*
      <div className="popup popup_trash">
        <div className="popup__body">
          <div className="popup__content">
            <form className="popup__form popup__trash" name="trash" noValidate>
              <h2 className="popup__title">Вы уверены?</h2>
              <button className="popup__button-save" type="submit">
                Да
              </button>
              <button className="popup__button-close" type="button" />
            </form>
          </div>
        </div>
      </div> */}
    </>
  );
}

export default PopupWithForm;
