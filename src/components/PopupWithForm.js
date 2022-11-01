import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(
    popup,
    form,
    submitEventHandler,
    formFields,
    getFieldsInfoFunction,
    closeButton,
    validateObj,
    saveButton
  ) {
    super(popup, closeButton);

    this._element = form;
    this._submitEventHandler = submitEventHandler;
    this._fields = formFields;
    this._getFieldsInfoFunction = getFieldsInfoFunction;
    this._validateObj = validateObj;
    this._saveButton = saveButton;
  }
  _getInputValues() {
    //собирает данные всех полей формы
    const fieldsValues = new Map();
    this._fields.forEach((element) => {
      fieldsValues.set(element.id, element.value);
    });
    return fieldsValues;
  }
  _setInputValues(data) {
    this._fields.forEach((element) => {
      element.value = data ? data.get(element.id) : "";
      this._validateObj.hideInputError(this._element, element);
    });
  }
  setEventListeners() {
    //обавлять обработчик сабмита формы
    this._element.addEventListener("submit", (evt) => {
      evt.preventDefault();

      const fields = this._getInputValues();

      this._submitEventHandler(evt, fields);
      this.close();
    });
  }
  close() {
    // при закрытии попапа форма должна ещё и сбрасываться
    //проходим по массиву элементов, сбрасываем все данные полей
    this._element.reset();
    super.close();
  }
  open() {
    //проходим по массиву элементов, сбрасываем все данные полей

    const data = this._getFieldsInfoFunction
      ? this._getFieldsInfoFunction()
      : null;

    this._setInputValues(data);
    this._validateObj.toggleButtonState(this._fields, this._saveButton);
    super.open();
  }
}
