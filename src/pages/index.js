import * as fields from "../components/Data.js";
import { Card } from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PicturePopup.js";
import UserInfo from "../components/UserInfo.js";
import FormFields from "../components/FormFields.js";
import { FormValidator } from "../components/FormValidator.js";
import Section from "../components/Section.js";
import "./index.css";

const photoFormFields = new FormFields([
  fields.photoTitleInput,
  fields.photoLinkInput,
]);

const userInfo = new UserInfo(
  fields.profileNameInput,
  fields.profileDescriptionInput,
  fields.nameField,
  fields.jobField
);
const profileValidator = new FormValidator(fields.validationProfile);
/* profileValidator.enableValidation(); */
const photoAddFormValidator = new FormValidator(fields.validationPhoto);
/* photoAddFormValidator.enableValidation();
 */
//сохранить данные формы редактироивания профиля
const saveProfileFormEvent = (evt) => {
  evt.preventDefault();
  userInfo.setUserInfo();
};

const userFormPopup = new PopupWithForm(
  fields.popupProfile,
  fields.profileForm,
  saveProfileFormEvent,
  [fields.profileNameInput, fields.profileDescriptionInput],
  userInfo.getUserInfo.bind(userInfo),
  fields.popupProfileCloseButton,
  profileValidator
);

function openViewPopup(evt) {
  const popupWithImage = new PopupWithImage(
    fields.popupView,
    evt.target,
    fields.popupPhotoImg,
    fields.popupPhotoTitle,
    fields.popupViewCloseButton
  );
  popupWithImage.open();
}

//сохранить данные формы добавления фото
const savePhotoFormEvent = (evt) => {
  evt.preventDefault();
  //получить данные полей формы
  const fieldsValues = photoFormFields.getInputFieldsValues();

  const section = new Section(
    {
      items: [
        {
          name: fieldsValues.get(fields.photoTitleInput.id),
          link: fieldsValues.get(fields.photoLinkInput.id),
        },
      ],
      renderer: (card) => {
        const cardEl = new Card(card, openViewPopup);
        return cardEl.generateCard();
      },
    },
    fields.elementsContainer
  );

  section.generateItems();
};

const photoFormPopup = new PopupWithForm(
  fields.popupPhoto,
  fields.photoAddForm,
  savePhotoFormEvent,
  [fields.photoTitleInput, fields.photoLinkInput],
  null,
  fields.popupAddPhotoCloseButton,
  photoAddFormValidator
);

fields.popupProfileOpenButton.addEventListener("click", (event) => {
  userFormPopup.open();
  userFormPopup.setEventListeners();
});

fields.popupAddPhotoAddButton.addEventListener("click", (event) => {
  photoFormPopup.open();
  photoFormPopup.setEventListeners();
});

initCards(fields.initialCards);

//инициируем массив карточек при загрузке страницы
function initCards(initialCards) {
  const section = new Section(
    {
      items: initialCards,
      renderer: (card) => {
        const cardEl = new Card(card, openViewPopup);
        return cardEl.generateCard();
      },
    },
    fields.elementsContainer
  );
  section.generateItems();
}
