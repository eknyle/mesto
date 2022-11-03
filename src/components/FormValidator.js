export class FormValidator {
  constructor(form, data) {
    this._form = form;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
  }
  _setEventListeners() {
    this.toggleButtonState(
      this._inputList,
      this._submitButton,
      this._inactiveButtonClass
    );
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this.toggleButtonState(
          this._inputList,
          this._submitButton,
          this._inactiveButtonClass
        );
        this._isValid(inputElement);
      });
    });
  }

  showInputError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  }

  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this.showInputError(inputElement, inputElement.validationMessage);
    } else {
      this.hideInputError(inputElement);
    }
  }
  _hasInvalidInput(inputList) {
    return inputList.some((inputEl) => {
      return !inputEl.validity.valid;
    });
  }

  toggleButtonState(inputList) {
    if (this._hasInvalidInput(inputList)) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.setAttribute("disabled", true);
    } else {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.removeAttribute("disabled");
    }
  }
  _getInputList() {
    const elements = this._form.querySelectorAll(".form__input");
    this._inputList = Array.prototype.slice.call(elements);
  }
  _getSubmitButton() {
    this._submitButton = this._form.querySelector('button[type="submit"]');
  }
  enableValidation() {
    this._getInputList();
    this._getSubmitButton();
    this._setEventListeners();
  }
}
