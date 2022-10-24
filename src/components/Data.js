export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

export const photoViewPopupSelector = ".popup_type_view";

//находим поля имя и описание деятельности
export const nameField = document.querySelector(".profile__title");
export const jobField = document.querySelector(".profile__description");
export const popupProfile = document.querySelector(".popup_type_profile");
export const popupPhoto = document.querySelector(".popup_type_photo");
export const popupView = document.querySelector(".popup_type_view");
export const popupPhotoImg = document.querySelector(".popup__image");
export const popupPhotoTitle = document.querySelector(".popup__image-title");
export const popupTitle = document.querySelector(".popup__container-title");
export const elementTemplate =
  document.querySelector(".element-template").content;
// Находим форму профиля
export const profileForm = document.querySelector(".form_type_profile");
// Находим поля формы редактирования профиля
export const profileNameInput = profileForm.querySelector(
  ".form__input_type_name"
);
export const profileDescriptionInput = profileForm.querySelector(
  ".form__input_type_description"
);
export const profileSaveButton = profileForm.querySelector(".form__save");
// Находим поля формы добавления фото
export const photoAddForm = document.querySelector(".form_type_photo");
export const photoTitleInput = photoAddForm.querySelector(
  ".form__input_type_title"
);
export const photoLinkInput = photoAddForm.querySelector(
  ".form__input_type_link"
);
export const popupAddPhotoSaveButton =
  photoAddForm.querySelector(".form__save");
//кнопка закрытия попап редактирования профиля
export const popupProfileCloseButton = document.querySelector("#popup__close");
//кнопка закрытия попап добавления фото
export const popupAddPhotoCloseButton = document.querySelector(
  "#popup-photo__close"
);
//кнопка закрытия попапа просмотра фото
export const popupViewCloseButton =
  document.querySelector("#popup-view__close");
//кнопка открыть попап редактирования профиля
export const popupProfileOpenButton = document.querySelector(
  ".profile__edit-button"
);
//кнопка открыть попап добавления фото
export const popupAddPhotoAddButton = document.querySelector(
  ".profile__add-button"
);
//контейнер для карточек
export const elementsContainer = document.querySelector(".elements");

export const photoViewPopupObj = {
  Image: popupPhotoImg,
  PhotoTitle: popupPhotoTitle,
  CloseButton: popupViewCloseButton,
};

/* export const validationObject = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__save",
  inactiveButtonClass: "form__save_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
}; */
export const validationProfile = {
  form: profileForm,
  inputList: [profileNameInput, profileDescriptionInput, profileSaveButton],
  submitButton: profileSaveButton,
  inactiveButtonClass: "form__save_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};
export const validationPhoto = {
  form: photoAddForm,
  inputList: [photoTitleInput, photoLinkInput],
  submitButton: popupAddPhotoSaveButton,
  inactiveButtonClass: "form__save_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};
