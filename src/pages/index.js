import * as fields from "../components/Data.js";
import { Card } from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PicturePopup.js";
import UserInfo from "../components/UserInfo.js";

import { FormValidator } from "../components/FormValidator.js";
import Section from "../components/Section.js";
import Api from "../components/Api.js";
import "./index.css";

const userInfo = new UserInfo(
  fields.profileNameInput,
  fields.profileDescriptionInput,
  fields.nameField,
  fields.jobField,
  fields.avatarField
);
let currentUserId = "";
function setUserId(data) {
  currentUserId = data;
}

function setInitialCards(array) {
  const section = new Section(
    {
      items: array,
      renderer: (card) => {
        const deleteHidden = currentUserId === card.owner._id ? false : true;
        return createCard(card, deleteHidden);
      },
    },
    fields.elementsContainer
  );
  section.generateItems();
}
const api = new Api();
api
  .getUserInfo()
  .then((result) => {
    setUserId(result._id);
    userInfo.setUserInfoFromServer(result);
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });
api
  .getInitialCards()
  .then((result) => {
    setInitialCards(result);
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });

const profileValidator = new FormValidator(fields.validationProfile);

const photoAddFormValidator = new FormValidator(fields.validationPhoto);

//сохранить данные формы редактироивания профиля
const saveProfileFormEvent = (evt, fieldsValues) => {
  evt.preventDefault();
  api
    .updateUserInfo(
      fieldsValues.get(fields.profileNameInput.id),
      fieldsValues.get(fields.profileDescriptionInput.id)
    )
    .then((data) => {
      userInfo.setUserInfo(fieldsValues);
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
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

function createCard(item, deleteHidden) {
  const card = new Card(
    item,
    openViewPopup,
    fields.elementTemplate,
    deleteHidden
  );
  return card.generateCard();
}
const newItemSection = new Section(
  { items: null, renderer: null },
  fields.elementsContainer
);
//сохранить данные формы добавления фото
const savePhotoFormEvent = (evt, fieldsValues) => {
  evt.preventDefault();
  const item = {
    name: fieldsValues.get(fields.photoTitleInput.id),
    link: fieldsValues.get(fields.photoLinkInput.id),
  };
  api
    .addNewCard(item.name, item.link)
    .then((data) => {
      newItemSection.addItem(createCard(item, false));
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
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
