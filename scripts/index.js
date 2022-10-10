import * as fields from "./Data.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

const profileValidator = new FormValidator(fields.validationProfile);
profileValidator.enableValidation();
const photoAddFormValidator = new FormValidator(fields.validationPhoto);
photoAddFormValidator.enableValidation();
//сохранить данные формы редактироивания профиля
const saveProfileFormEvent = (evt) => {
  evt.preventDefault();
  fields.nameField.textContent = fields.profileNameInput.value;
  fields.jobField.textContent = fields.profileDescriptionInput.value;
};
const savePhotoFormEvent = (evt) => {
  evt.preventDefault();

  const link = fields.photoLinkInput.value;
  const title = fields.photoTitleInput.value;
  const card = new Card(
    {
      name: title,
      link: link,
    },
    openViewPopup,
    fields.elementsContainer
  );
  card.createCard();
};

fields.popupProfileOpenButton.addEventListener("click", (event) => {
  openProfilePopup();
});

fields.popupAddPhotoAddButton.addEventListener("click", (event) => {
  openPhotoForm();
});

initCards(fields.initialCards);

//инициируем массив карточек при загрузке страницы
function initCards(initialCards) {
  for (let i = 0; i < initialCards.length; i++) {
    const card = new Card(
      initialCards[i],
      openViewPopup,
      fields.elementsContainer
    );
    card.createCard();
  }
}

//вместо Popup.js "чтобы потом не переписывать код заново" делаем кучу из всего что касается попапов

function removePopupBaseEventListeners() {
  const openedPopupWindow = document.querySelector(".popup_opened");
  openedPopupWindow.removeEventListener("keydown", closeByClick);
  document.removeEventListener("keydown", closeByEscape);
}

function closeByClick(evt) {
  const openedPopupWindow = document.querySelector(".popup_opened");
  if (evt.type === "click" && evt.target === openedPopupWindow) {
    closePopup(openedPopupWindow);
  }
}
function closeByEscape(evt) {
  if (evt.code === "Escape") {
    const openedPopupWindow = document.querySelector(".popup_opened");
    closePopup(openedPopupWindow);
  }
}
function addPopupBaseEventListeners() {
  const openedPopupWindow = document.querySelector(".popup_opened");
  document.addEventListener("keydown", closeByEscape);
  openedPopupWindow.addEventListener("click", closeByClick);
}

//метод открывает попап
function openPopup(popup) {
  popup.classList.add("popup_opened");
  addPopupBaseEventListeners();
}
//метод закрывает попап
function closePopup(popup) {
  removePopupBaseEventListeners();
  popup.classList.remove("popup_opened");
}

//попап профиля
function addProfilePopupEventListeners() {
  fields.popupProfile.addEventListener("submit", (evt) => {
    saveProfileFormEvent(evt);
    closePopup(fields.popupProfile);
  });

  fields.popupProfileCloseButton.addEventListener("click", () => {
    closePopup(fields.popupProfile);
  });
}

//предзаполнить поля на форме и открыть попап редактирования формы
function openProfilePopup() {
  fields.profileNameInput.value = fields.nameField.textContent;
  fields.profileDescriptionInput.value = fields.jobField.textContent;

  profileValidator.hideInputError(fields.profileForm, fields.profileNameInput);
  profileValidator.hideInputError(
    fields.profileForm,
    fields.profileDescriptionInput
  );

  openPopup(fields.popupProfile);
}

//попап добавления фото
function addPhotoFormEventListeners() {
  fields.popupPhoto.addEventListener("submit", (evt) => {
    savePhotoFormEvent(evt);
    closePopup(fields.popupPhoto);
  });

  fields.popupAddPhotoCloseButton.addEventListener("click", () => {
    closePopup(fields.popupPhoto);
  });
}

function openPhotoForm() {
  fields.photoTitleInput.value = "";
  fields.photoLinkInput.value = "";

  photoAddFormValidator.hideInputError(
    fields.photoAddForm,
    fields.photoTitleInput
  );
  photoAddFormValidator.hideInputError(
    fields.photoAddForm,
    fields.photoLinkInput
  );

  photoAddFormValidator.toggleButtonState(
    [fields.photoTitleInput, fields.photoLinkInput],
    fields.popupAddPhotoSaveButton
  );
  openPopup(fields.popupPhoto);
}

//попап просмотра фото
function addPhotoViewEventListeners() {
  fields.popupViewCloseButton.addEventListener("click", () => {
    closePopup(fields.popupView);
  });
}
function openViewPopup(evt) {
  fields.popupPhotoImg.setAttribute("src", evt.target.getAttribute("src"));
  fields.popupPhotoImg.setAttribute("alt", evt.target.getAttribute("alt"));
  fields.popupPhotoTitle.textContent = evt.target.getAttribute("alt");
  addPhotoViewEventListeners();
  openPopup(fields.popupView);
}

addPhotoFormEventListeners();
addProfilePopupEventListeners();
