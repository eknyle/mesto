export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector); // селектор попап
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleClickClose = this._handleClickClose.bind(this);
    this._handleCloseButton = this._handleCloseButton.bind(this);
    this._closeButton = this._popup.querySelector(`#${this._popup.id}__close`);
  }

  open() {
    //открытие попапа
    this._setEscEventListener();
    this._popup.classList.add("popup_opened");
  }
  close() {
    //закрытие попапа
    this._removeEscEventListener();
    this._popup.classList.remove("popup_opened");
  }
  _handleEscClose(evt) {
    //содержит логику закрытия попапа клавишей Esc
    if (evt.code === "Escape") {
      this.close();
    }
  }
  _handleClickClose(evt) {
    if (evt.type === "click" && evt.target === this._popup) {
      this.close();
    }
  }
  _handleCloseButton() {
    this.close();
  }
  _setEscEventListener() {
    document.addEventListener("keydown", this._handleEscClose);
  }
  setEventListeners() {
    //добавляет слушатель клика иконке закрытия попапа. Модальное окно также закрывается при клике на затемнённую
    //область вокруг формы

    this._closeButton.addEventListener("click", this._handleCloseButton);
    this._popup.addEventListener("click", this._handleClickClose);
  }
  _removeEscEventListener() {
    //this._element.removeEventListener("click", this._handleClickClose);
    document.removeEventListener("keydown", this._handleEscClose);
    //this._closeButton.removeEventListener("click", this._handleCloseButton);
  }
}
