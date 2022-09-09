const initialCards = [
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

const popupProfile = document.querySelector(".popup_type_profile");
const popupPhoto = document.querySelector(".popup_type_photo");
const popupView = document.querySelector(".popup_type_view");
const popupPhotoImg = document.querySelector(".popup__image");
const popupPhotoTitle = document.querySelector(".popup__image-title");
const popupTitle = document.querySelector(".popup__container-title");
const elementTemplate = document.querySelector(".element-template").content;
//находим поля имя и описание деятельности
const nameField = document.querySelector(".profile__title");
const jobField = document.querySelector(".profile__description");

// Находим форму профиля
const profileForm = document.querySelector(".form_type_profile");
// Находим поля формы редактирования профиля
const profileNameInput = profileForm.querySelector(".form__input_type_name");
const profileDescriptionInput = profileForm.querySelector(
  ".form__input_type_description"
);
const profileSaveButton = profileForm.querySelector(".form__save");
profileForm.addEventListener("submit", saveProfileForm);

// Находим поля формы добавления фото
const photoAddForm = document.querySelector(".form_type_photo");
const photoTitleInput = photoAddForm.querySelector(".form__input_type_title");
const photoLinkInput = photoAddForm.querySelector(".form__input_type_link");
const photoSaveButton = photoAddForm.querySelector(".form__save");
photoAddForm.addEventListener("submit", savePhotoAddForm);

//заркыть попап редактирования профиля
const closeProfileButton = document.querySelector("#popup__close");
closeProfileButton.addEventListener("click", (event) =>
  closePopup(popupProfile)
);
//заркыть попап добавления фото
const closePhotoButton = document.querySelector("#popup-photo__close");
closePhotoButton.addEventListener("click", (event) => closePopup(popupPhoto));
//заркыть попап просмотра фото
const popupViewButton = document.querySelector("#popup-view__close");
popupViewButton.addEventListener("click", (event) => closePopup(popupView));

//открыть попап редактирования профиля
const editButton = document.querySelector(".profile__edit-button");
editButton.addEventListener("click", (event) =>
  prepareProfileForm(popupProfile, event)
);
//открыть попап добавления фото
const addButton = document.querySelector(".profile__add-button");
addButton.addEventListener("click", (event) =>
  prepareAddPhotoForm(popupPhoto, event)
);

const elementsContainer = document.querySelector(".elements");
initCards(initialCards);

//добавляем обработчик нажатия кнопки на оверлее
function addClickEventListener(popupWindow) {
  popupWindow.addEventListener("click", function (evt) {
    if (evt.target === popupWindow) {
      closePopup(popupWindow);
    }
  });
}

function removeEscEventListener(popupWindow) {
  document.removeEventListener("keydown", closePopup);
}

//добавляем обработчик нажатия кнопки esc
function addEscEventListener(popupWindow) {
  document.addEventListener("keydown", function (evt) {
    if (evt.code === "Escape") {
      closePopup(popupWindow);
    }
  });
}
//вызвать событие input в поле ввода данных
function triggerInputEvent(inputField) {
  inputField.dispatchEvent(new Event("input"));
}
//предзаполнить поля на форме и открыть попап
function prepareProfileForm(popupWindow, evt) {
  profileNameInput.value = nameField.textContent;
  hideInputError(
    popupWindow,
    profileNameInput,
    validationObject.inputErrorClass,
    validationObject.errorClass
  );
  profileDescriptionInput.value = jobField.textContent;
  hideInputError(
    popupWindow,
    profileDescriptionInput,
    validationObject.inputErrorClass,
    validationObject.errorClass
  );
  openPopup(popupWindow);
  addEscEventListener(popupWindow);
  addClickEventListener(popupWindow);
}
//предзаполнить поля на форме и открыть попап
function prepareAddPhotoForm(popupWindow, evt) {
  photoTitleInput.value = "";
  hideInputError(
    popupWindow,
    photoTitleInput,
    validationObject.inputErrorClass,
    validationObject.errorClass
  );
  photoLinkInput.value = "";
  hideInputError(
    popupWindow,
    photoLinkInput,
    validationObject.inputErrorClass,
    validationObject.errorClass
  );
  openPopup(popupWindow);
  addEscEventListener(popupWindow);
  addClickEventListener(popupWindow);
}
//открыть попап просмотра фото
function prepareViewPhotoForm(popupWindow, evt) {
  popupPhotoImg.setAttribute("src", evt.target.getAttribute("src"));
  popupPhotoImg.setAttribute("alt", evt.target.getAttribute("alt"));
  popupPhotoTitle.textContent = evt.target.getAttribute("alt");
  openPopup(popupWindow);
  addEscEventListener(popupWindow);
  addClickEventListener(popupWindow);
}
//открыть попап
function openPopup(popupWindow) {
  popupWindow.classList.add("popup_opened");
}
//закрыть попап
function closePopup(popupWindow) {
  removeEscEventListener(popupWindow);
  popupWindow.classList.remove("popup_opened");
}
//добавлем карточку на страницу
function addCard(element) {
  elementsContainer.prepend(element);
}
//создаем карточку на страницу
function createCard(name, link) {
  const element = elementTemplate.querySelector(".element").cloneNode(true);
  const image = element.querySelector(".element__image");
  image.setAttribute("src", link);
  image.setAttribute("alt", name);
  image.addEventListener("click", (event) =>
    prepareViewPhotoForm(popupView, event)
  );

  element.querySelector(".element__title").textContent = name;
  const likeButton = element.querySelector(".element__like");
  likeButton.addEventListener("click", likeCard);
  const deleteButton = element.querySelector(".element__delete");
  deleteButton.addEventListener("click", deleteCard);
  return element;
}
//собираем карточку
function assambleCard(name, link) {
  addCard(createCard(name, link));
}
//инициируем массив карточек при загрузке страницы
function initCards(initialCards) {
  for (let i = 0; i < initialCards.length; i++) {
    assambleCard(initialCards[i].name, initialCards[i].link);
  }
}
//удаляем карточки
function deleteCard(evt) {
  elementsContainer.removeChild(evt.target.parentElement);
}
//сохраняем лайк картинки
function likeCard(evt) {
  evt.target.classList.toggle("element_liked");
}
//сохранить данные формы в поля на странице
function saveProfileForm(evt) {
  evt.preventDefault();
  nameField.textContent = profileNameInput.value;
  jobField.textContent = profileDescriptionInput.value;
  closePopup(popupProfile, evt);
}
//сохранить данные формы добавления фото
function savePhotoAddForm(evt) {
  evt.preventDefault();
  assambleCard(photoTitleInput.value, photoLinkInput.value);
  closePopup(popupPhoto, evt);
}
