import * as fields from "../components/Data.js";
import { Card } from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PicturePopup.js";
import UserInfo from "../components/UserInfo.js";

import { FormValidator } from "../components/FormValidator.js";
import Section from "../components/Section.js";
import "./index.css";

const userInfo = new UserInfo(
  fields.profileNameInput,
  fields.profileDescriptionInput,
  fields.nameField,
  fields.jobField
);

const section = new Section(
  {
    items: fields.initialCards,
    renderer: (card) => {
      return createCard(card);
    },
  },
  fields.elementsContainer
);
section.generateItems();

const profileValidator = new FormValidator(fields.validationProfile);

const photoAddFormValidator = new FormValidator(fields.validationPhoto);

//сохранить данные формы редактироивания профиля
const saveProfileFormEvent = (evt, fieldsValues) => {
  evt.preventDefault();
  userInfo.setUserInfo(fieldsValues);
};

const userFormPopup = new PopupWithForm(
  fields.popupProfile,
  fields.profileForm,
  saveProfileFormEvent,
  [fields.profileNameInput, fields.profileDescriptionInput],
  userInfo.getUserInfo.bind(userInfo),
  fields.popupProfileCloseButton,
  profileValidator,
  fields.profileSaveButton
);
userFormPopup.setEventListeners();
profileValidator.enableValidation();

const popupWithImage = new PopupWithImage(
  fields.popupView,
  fields.popupViewCloseButton
);
popupWithImage.addEventListeners();

function openViewPopup(evt) {
  popupWithImage.open(evt.target, fields.popupPhotoImg, fields.popupPhotoTitle);
}

function createCard(item) {
  const card = new Card(item, openViewPopup, fields.elementTemplate);
  return card.generateCard();
}

//сохранить данные формы добавления фото
const savePhotoFormEvent = (evt, fieldsValues) => {
  evt.preventDefault();
  const item = {
    name: fieldsValues.get(fields.photoTitleInput.id),
    link: fieldsValues.get(fields.photoLinkInput.id),
  };
  section.addItem(createCard(item));
};

const photoFormPopup = new PopupWithForm(
  fields.popupPhoto,
  fields.photoAddForm,
  savePhotoFormEvent,
  [fields.photoTitleInput, fields.photoLinkInput],
  null,
  fields.popupAddPhotoCloseButton,
  photoAddFormValidator,
  fields.popupAddPhotoSaveButton
);
photoFormPopup.setEventListeners();
photoAddFormValidator.enableValidation();

fields.popupProfileOpenButton.addEventListener("click", (event) => {
  userFormPopup.open();
});

fields.popupAddPhotoAddButton.addEventListener("click", (event) => {
  photoFormPopup.open();
});
