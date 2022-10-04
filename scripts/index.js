import { ProfilePopup, PhotoAddPopup, PhotoViewPopup } from "./Popup.js";
import * as fields from "./Data.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

const generateCard = (...args) => new Card(...args);
const openViewPopup = (...args) => new PhotoViewPopup(...args);
const validator = (...args) => new FormValidator(...args);

//заполняем все данные для объекта попапа редактирования формы
const profilePopupSelector = ".popup_type_profile";
const profilePopupDataObject = {
  NameInput: fields.profileNameInput,
  DescriptionInput: fields.profileDescriptionInput,
  NameField: fields.nameField,
  DescriptionField: fields.jobField,
  ProfileForm: fields.popupProfile,
  SaveButton: fields.profileSaveButton,
  CloseButton: fields.closeProfileButton,
  Validator: validator,
};
fields.editButton.addEventListener("click", (event) => {
  const profilePopupObj = new ProfilePopup(
    profilePopupSelector,
    profilePopupDataObject
  );
  profilePopupObj.open();
});

const photoAddPopupSelector = ".popup_type_photo";
const photoAddPopupDataObject = {
  PhotoTitleInput: fields.photoTitleInput,
  PhotoLinkInput: fields.photoLinkInput,
  ClosePhotoButton: fields.closePhotoButton,
  Form: fields.photoAddForm,
  GenerateCard: generateCard,
  Validator: validator,
  OpenViewPopup: openViewPopup,
};

fields.addButton.addEventListener("click", (event) => {
  const photoAddPopupObj = new PhotoAddPopup(
    photoAddPopupSelector,
    photoAddPopupDataObject
  );
  photoAddPopupObj.open();
});

initCards(fields.initialCards);

//инициируем массив карточек при загрузке страницы
function initCards(initialCards) {
  for (let i = 0; i < initialCards.length; i++) {
    const card = new Card(initialCards[i], openViewPopup);
    card.generateCard();
  }
}
