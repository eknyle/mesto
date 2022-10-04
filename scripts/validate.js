/* const validationObject = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__save",
  inactiveButtonClass: "form__save_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};
const validationProfile = {
  formSelector: ".form_type_profile",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__save",
  inactiveButtonClass: "form__save_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};
const validationPhoto = {
  formSelector: ".form_type_photo",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__save",
  inactiveButtonClass: "form__save_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};

function setEventListeners(
  formElement,
  inputSelector,
  inputErrorClass,
  errorClass,
  buttonElement,
  inactiveButtonClass
) {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  toggleButtonState(inputList, buttonElement, inactiveButtonClass);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
      isValid(formElement, inputElement, inputErrorClass, errorClass);
    });
  });
}

function showInputError(
  formElement,
  inputElement,
  errorMessage,
  inputErrorClass,
  errorClass
) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
}
function hideInputError(
  formElement,
  inputElement,
  inputErrorClass,
  errorClass
) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = "";
}

function isValid(formElement, inputElement, inputErrorClass, errorClass) {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      inputErrorClass,
      errorClass
    );
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
}
function hasInvalidInput(inputList) {
  return inputList.some((inputEl) => {
    return !inputEl.validity.valid;
  });
}



function enableValidation(obj) {
  const formList = Array.from(document.querySelectorAll(obj.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    const buttonElement = formElement.querySelector(obj.submitButtonSelector);
    setEventListeners(
      formElement,
      obj.inputSelector,
      obj.inputErrorClass,
      obj.errorClass,
      buttonElement,
      obj.inactiveButtonClass
    );
  });
}
enableValidation(validationObject);
 */
