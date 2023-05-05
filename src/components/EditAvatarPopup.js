import React, { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}){

  const inputValueRef = useRef()


  function handleSubmit(e){
    e.preventDefault()
    onUpdateAvatar({
      avatar: inputValueRef.current.value
    })

  }
  return (
<PopupWithForm
        isOpen={isOpen}
        title="Обновить аватар"
        name="avatar"
        onClose={onClose}
        onSumbit={handleSubmit}
      >
        <input
          id="input-avatar"
          className="popup__input popup__input_avatar"
          type="url"
          name="avatar"
          placeholder="Ссылка на аватар"
          required
          ref={inputValueRef}
        />
        <span id="input-avatar-error" className="popup__error" />
      </PopupWithForm>
  )
}

export default EditAvatarPopup
