export const photoViewPopupSelector = ".popup_type_view";
export const popupConfirm = ".popup_type_delete-card"; //document.querySelector(".popup_type_delete-card");
export const popupConfirmCloseButton = document.querySelector(".popup__close");
export const popupConfirmSaveButton = document.querySelector(".popup__save");

export const popupAvatar = ".popup_type_avatar"; //document.querySelector(".popup_type_avatar");
export const avatarForm = document.querySelector(".form_type_avatar"); //
export const avatarLinkInput = avatarForm.querySelector(
  ".form__input_type_link"
);
export const popupAvatarCloseButton = document.querySelector(
  ".popup__avatar-close"
);
export const avatarSaveButton = avatarForm.querySelector(".form__save");
export const popupAvatarContainer = document.querySelector(
  ".profile__avatar-container"
);

//находим поля имя и описание деятельности
export const avatarField = document.querySelector(".profile__avatar");
export const nameField = ".profile__title"; //document.querySelector(".profile__title");
export const jobField = ".profile__description"; //document.querySelector(".profile__description");
export const popupProfile = ".popup_type_profile"; //document.querySelector(".popup_type_profile");
export const popupPhoto = ".popup_type_photo"; //document.querySelector(".popup_type_photo");
export const popupView = ".popup_type_view"; //document.querySelector(".popup_type_view");
export const popupPhotoImg = document.querySelector(".popup__image");
export const popupPhotoTitle = document.querySelector(".popup__image-title");
export const popupTitle = document.querySelector(".popup__container-title");

export const elementTemplate = ".element-template";
/*   document.querySelector(".element-template").content; */
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
export const elementsContainer = ".elements"; //document.querySelector(".elements");

export const photoViewPopupObj = {
  Image: popupPhotoImg,
  PhotoTitle: popupPhotoTitle,
  CloseButton: popupViewCloseButton,
};

export const validationObject = {
  inactiveButtonClass: "form__save_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};
/* 
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
export const validationAvatar = {
  form: avatarForm,
  inputList: [avatarLinkInput],
  submitButton: avatarSaveButton,
  inactiveButtonClass: "form__save_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};
 */
