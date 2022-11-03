import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popup, submitEventHandler) {
    super(popup);
    this._popup = popup;
    this._submitEventHandler = submitEventHandler;
    this.form = document.querySelector(this._popup).querySelector(".form");
    this._submitButton = this.form.querySelector('button[type="submit"]');
  }
  renderSubmitButtonText(text) {
    this._submitButton.textContent = text;
  }
  _getInputList() {
    const elements = this.form.querySelectorAll(".form__input");
    this.inputList = Array.prototype.slice.call(elements);
  }
  _getInputValues() {
    this._formValues = {};
    this.inputList.forEach((input) => {
      this._formValues[input.id] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    //обавлять обработчик сабмита формы

    this._getInputList();
    super.setEventListeners();
    this.form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitEventHandler(
        evt,
        this._getInputValues(),
        this.close.bind(this)
      );
    });
  }
  close() {
    // при закрытии попапа форма должна ещё и сбрасываться
    //проходим по массиву элементов, сбрасываем все данные полей
    this.form.reset();
    super.close();
  }
  open() {
    super.open();
  }
}
