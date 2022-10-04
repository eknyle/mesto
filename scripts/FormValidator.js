export class FormValidator {
  constructor(data) {
    this._formSelector = data.formSelector;
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
  }
  _setEventListeners(formElement, buttonElement) {
    const inputList = Array.from(
      formElement.querySelectorAll(this._inputSelector)
    );
    this._toggleButtonState(
      inputList,
      buttonElement,
      this._inactiveButtonClass
    );
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._toggleButtonState(
          inputList,
          buttonElement,
          this._inactiveButtonClass
        );
        this._isValid(
          formElement,
          inputElement,
          this._inputErrorClass,
          this._errorClass
        );
      });
    });
  }

  showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  }

  _isValid(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this.showInputError(
        formElement,
        inputElement,
        inputElement.validationMessage
      );
    } else {
      this.hideInputError(formElement, inputElement);
    }
  }
  _hasInvalidInput(inputList) {
    return inputList.some((inputEl) => {
      return !inputEl.validity.valid;
    });
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.setAttribute("disabled", true);
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.removeAttribute("disabled");
    }
  }

  enableValidation() {
    const formList = Array.from(document.querySelectorAll(this._formSelector));

    formList.forEach((formElement) => {
      const buttonElement = formElement.querySelector(
        this._submitButtonSelector
      );
      this._setEventListeners(formElement, buttonElement);
    });
  }
}
