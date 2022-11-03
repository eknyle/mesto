export default class Popup {
  constructor(popup) {
    this._popup = popup; // селектор попап
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleClickClose = this._handleClickClose.bind(this);
    this._handleCloseButton = this._handleCloseButton.bind(this);
  }
  _getTemplate() {
    this._element = document.querySelector(this._popup);
    this._closeButton = document.querySelector(`#${this._element.id}__close`);
  }
  open() {
    //открытие попапа
    this._setEscEventListener();
    this._element.classList.add("popup_opened");
  }
  close() {
    //закрытие попапа
    this._removeEscEventListener();
    this._element.classList.remove("popup_opened");
  }
  _handleEscClose(evt) {
    //содержит логику закрытия попапа клавишей Esc
    if (evt.code === "Escape") {
      this.close();
    }
  }
  _handleClickClose(evt) {
    if (evt.type === "click" && evt.target === this._element) {
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
    this._getTemplate();
    this._closeButton.addEventListener("click", this._handleCloseButton);
    this._element.addEventListener("click", this._handleClickClose);
  }
  _removeEscEventListener() {
    //this._element.removeEventListener("click", this._handleClickClose);
    document.removeEventListener("keydown", this._handleEscClose);
    //this._closeButton.removeEventListener("click", this._handleCloseButton);
  }
}
