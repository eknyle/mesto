export default class Popup {
  constructor(popup, closeButton) {
    this._popup = popup; // попап
    this._closeButton = closeButton;
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleClickClose = this._handleClickClose.bind(this);
    this._handleCloseButton = this._handleCloseButton.bind(this);
  }

  open() {
    //открытие попапа

    this._popup.classList.add("popup_opened");
    this._setEventListeners();
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
  _handleCloseButton() {
    this.close();
  }

  _setEventListeners() {
    //добавляет слушатель клика иконке закрытия попапа. Модальное окно также закрывается при клике на затемнённую
    //область вокруг формы

    this._closeButton.addEventListener("click", this._handleCloseButton);
    document.addEventListener("keydown", this._handleEscClose);

    this._popup.addEventListener("click", this._handleClickClose);
  }
  _removeEventListeners() {
    this._popup.removeEventListener("click", this._handleClickClose);

    document.removeEventListener("keydown", this._handleEscClose);

    this._closeButton.removeEventListener("click", this._handleCloseButton);
  }
}
