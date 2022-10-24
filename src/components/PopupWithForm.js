import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(
    popup,
    form,
    submitEventHandler,
    formFields,
    getFieldsInfoFunction,
    closeButton,
    validateObj
  ) {
    super(popup);

    this._element = form;
    this._submitEventHandler = submitEventHandler;
    this._fields = formFields;
    this._getFieldsInfoFunction = getFieldsInfoFunction;
    this._closeButton = closeButton;
    this._validateObj = validateObj;
  }
  _getInputValues() {
    //собирает данные всех полей формы
    const valuesArr = [];
    this._fields.forEach((element) => {
      valuesArr.push({ key: element.name, value: element.value });
    });
    return valuesArr;
  }
  setEventListeners() {
    super.setEventListeners();
    //обавлять обработчик сабмита формы
    this._element.addEventListener(
      "submit",
      (evt) => {
        evt.preventDefault();
        /*  console.log(evt); */
        this._submitEventHandler(evt);
        super.close();
      },
      {
        once: true,
      }
    );
    this._closeButton.addEventListener(
      "click",
      () => {
        this.close();
      },
      { once: true }
    );
  }
  close() {
    // при закрытии попапа форма должна ещё и сбрасываться
    //проходим по массиву элементов, сбрасываем все данные полей
    this._element.reset();
    super.close();
  }
  open() {
    //проходим по массиву элементов, сбрасываем все данные полей
    const fieldsPreValues = this._getFieldsInfoFunction
      ? this._getFieldsInfoFunction()
      : null;

    this._fields.forEach((element) => {
      element.value = fieldsPreValues ? fieldsPreValues.get(element.id) : "";
      this._validateObj.hideInputError(this._element, element);
    });
    this._validateObj.enableValidation();
    super.open();
  }
}
