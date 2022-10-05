import * as fields from "./Data.js";

class Popup {
  constructor(selector) {
    this._selector = selector;
  }

  //получили элемент попапа со страницы
  _getTemplate() {
    this._element = document.querySelector(this._selector);
  }

  _addBaseEventListeners() {
    document.addEventListener("keydown", (evt) => {
      this._closeByEscape(evt);
    });
    const openedPopupWindow = document.querySelector(".popup_opened");
    openedPopupWindow.addEventListener("click", (evt) => {
      this._closeByClick(evt);
    });
  }

  _removeBaseEventListeners() {
    const openedPopupWindow = document.querySelector(".popup_opened");
    if (openedPopupWindow) {
      openedPopupWindow.removeEventListener("keydown", this._closeByClick);
    }
    document.removeEventListener("keydown", this._closeByEscape);
  }

  _closeByClick(evt) {
    const openedPopupWindow = document.querySelector(".popup_opened");
    if (evt.type === "click" && evt.target === openedPopupWindow) {
      this.close();
    }
  }
  _closeByEscape(evt) {
    if (evt.code === "Escape") {
      this.close();
    }
  }

  //метод открывает попап
  open() {
    this._element.classList.add("popup_opened");
    this._addBaseEventListeners();
  }
  //метод закрывает попап
  close() {
    this._removeBaseEventListeners();
    this._element.classList.remove("popup_opened");
  }
}

export class ProfilePopup extends Popup {
  constructor(selector, data) {
    super(selector);
    this._nameInput = data.NameInput;
    this._descriptionInput = data.DescriptionInput;
    this._nameField = data.NameField;
    this._descriptionField = data.DescriptionField;
    this._form = data.ProfileForm;
    this._saveButton = data.SaveButton;
    this._closeButton = data.CloseButton;
    this._validator = data.Validator;
  }
  _addEventListeners() {
    this._form.addEventListener("submit", this._saveProfileForm.bind(this), {
      once: true,
    });
    this._closeButton.addEventListener(
      "click",
      () => {
        super.close();
      },
      { once: true }
    );
  }

  //предзаполнить поля на форме и открыть попап редактирования формы
  open() {
    super._getTemplate();
    this._nameInput.value = this._nameField.textContent;
    this._descriptionInput.value = this._descriptionField.textContent;
    const validateObj = this._validator(fields.validationProfile);
    validateObj.enableValidation();
    validateObj.hideInputError(this._form, this._nameInput);
    validateObj.hideInputError(this._form, this._descriptionInput);
    this._addEventListeners();
    super.open();
  }

  //сохранить данные формы в поля на странице
  _saveProfileForm(evt) {
    evt.preventDefault();
    this._nameField.textContent = this._nameInput.value;
    this._descriptionField.textContent = this._descriptionInput.value;
    super.close();
  }
}
export class PhotoViewPopup extends Popup {
  constructor(target, selector, data) {
    super(selector);
    this._eventTarget = target;
    this._image = data.Image;
    this._photoTitle = data.PhotoTitle;
    this._closeButton = data.CloseButton;
  }
  _addEventListeners() {
    this._closeButton.addEventListener("click", () => {
      super.close();
    });
  }
  open() {
    super._getTemplate();
    this._image.setAttribute("src", this._eventTarget.getAttribute("src"));
    this._image.setAttribute("alt", this._eventTarget.getAttribute("alt"));
    this._photoTitle.textContent = this._eventTarget.getAttribute("alt");
    this._addEventListeners();
    super.open();
  }
}
export class PhotoAddPopup extends Popup {
  constructor(selector, data) {
    super(selector);
    this._photoTitleInput = data.PhotoTitleInput;
    this._photoLinkInput = data.PhotoLinkInput;
    this._closeButton = data.ClosePhotoButton;
    this._form = data.Form;
    this._createCard = data.GenerateCard;
    this._validator = data.Validator;
    this._openViewPopup = data.OpenViewPopup;
  }
  _addEventListeners() {
    this._form.addEventListener("submit", this._savePhotoForm.bind(this), {
      once: true,
    });

    this._closeButton.addEventListener(
      "click",
      () => {
        super.close();
      },
      { once: true }
    );
  }

  open() {
    super._getTemplate();

    this._photoTitleInput.value = "";
    this._photoLinkInput.value = "";

    const validateObj = this._validator(fields.validationPhoto);
    validateObj.enableValidation();
    this._addEventListeners();
    super.open();
  }

  _savePhotoForm(evt) {
    evt.preventDefault();

    const link = this._photoLinkInput.value;
    const title = this._photoTitleInput.value;
    const card = this._createCard(
      {
        name: title,
        link: link,
      },
      this._openViewPopup
    );
    card.generateCard();

    super.close();
  }
}
