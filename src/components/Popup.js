export default class Popup {
  constructor(popup) {
    this._popup = popup; // попап
  }

  open() {
    //открытие попапа
    this._popup.classList.add("popup_opened");

    /*  this.setEventListeners(); */
  }
  close() {
    //закрытие попапа
    this._removeEventListeners();
    this._popup.classList.remove("popup_opened");
  }
  _handleEscClose(evt) {
    //содержит логику закрытия попапа клавишей Esc
    if (evt.code === "Escape") {
      this.close();
    }
  }
  _handleClickClose(evt) {
    const openedPopupWindow = document.querySelector(".popup_opened");
    if (evt.type === "click" && evt.target === openedPopupWindow) {
      this.close();
    }
  }
  setEventListeners() {
    //добавляет слушатель клика иконке закрытия попапа. Модальное окно также закрывается при клике на затемнённую
    //область вокруг формы

    document.addEventListener("keydown", (evt) => {
      this._handleEscClose(evt);
    });
    const openedPopupWindow = document.querySelector(".popup_opened");
    openedPopupWindow.addEventListener("click", (evt) => {
      this._handleClickClose(evt);
    });
  }
  _removeEventListeners() {
    const openedPopupWindow = document.querySelector(".popup_opened");
    if (openedPopupWindow) {
      openedPopupWindow.removeEventListener("keydown", this._handleClickClose);
    }
    document.removeEventListener("keydown", this._handleEscClose);
  }
}
