
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];



const popupProfile = document.querySelector("#popup");
const popupPhoto = document.querySelector("#popup-photo");
const popupView = document.querySelector("#popup-view");
const popupPhotoImg = document.querySelector(".popup__image");
const popupPhotoTitle = document.querySelector(".popup__image-title");
const popupTitle = document.querySelector(".popup__container-title");
const elementTemplate = document.querySelector('#element-template').content;

//заркыть попап редактирования профиля
const closeButton = document.querySelector("#popup__close");
closeButton.addEventListener('click', (event) => closePopup(popupProfile, event));
//заркыть попап добавления фото
const closePhotoButton = document.querySelector("#popup-photo__close");
closePhotoButton.addEventListener('click', (event) => closePopup(popupPhoto, event));
//заркыть попап просмотра фото
const popupViewButton = document.querySelector("#popup-view__close");
popupViewButton.addEventListener('click', (event) => closePopup(popupView, event));

//открыть попап редактирования профиля
const editButton = document.querySelector(".profile__edit-button");
editButton.addEventListener('click', (event) => openPopup(popupProfile, event));
//открыть попап добавления фото
const addButton = document.querySelector(".profile__add-button");
addButton.addEventListener('click', (event) => openPopup(popupPhoto, event));

const elementsContainer = document.querySelector(".elements");
initCards(initialCards);



//находим поля имя и описание деятельности
const nameField = document.querySelector(".profile__title");
const jobField = document.querySelector(".profile__description");

// Находим форму профиля
const profileForm = document.querySelector("#profile-info");
// Находим поля формы редактирования профиля
const profileNameInput = profileForm.querySelector(".form__input_type_name");
const profileDescriptionInput = profileForm.querySelector(".form__input_type_description");
const profileSaveButton = profileForm.querySelector(".form__save");
profileForm.addEventListener('submit', saveProfileForm);

// Находим поля формы добавления фото
const photoAddForm = document.querySelector("#photo-info");
const photoTitleInput = photoAddForm.querySelector(".form__input_type_title");
const photoLinkInput = photoAddForm.querySelector(".form__input_type_link");
const photoSaveButton = photoAddForm.querySelector(".form__save");
photoAddForm.addEventListener('submit', savePhotoAddForm);


//открыть попап профиля и предзаполнить поля на форме
function openPopup(popupWindow, evt) {
    reFillFields(popupWindow.id, evt.target);
    popupWindow.classList.add('popup_opened');
}
//закрыть попап
function closePopup(popupWindow, evt) {
    //проверяем классы
    popupWindow.classList.remove('popup_opened');
}
//добавлем карточку на страницу
function addCard(element) {
    elementsContainer.prepend(element);
}

//собираем карточку
function assambleCard(name, link) {
    const element = elementTemplate.querySelector('.element').cloneNode(true);
    const image = element.querySelector('.element__image');
    image.setAttribute('src', link);
    image.setAttribute('alt', name);
    image.addEventListener('click', (event) => openPopup(popupView, event));

    element.querySelector('.element__title').textContent = name;
    const likeButton = element.querySelector('.element__like');
    likeButton.addEventListener('click', likeCard);
    const deleteButton = element.querySelector('.element__delete');
    deleteButton.addEventListener('click', deleteCard);
    addCard(element);
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
    evt.target.classList.toggle('element_liked');
}

//подготовка попапа в зависимости от формы
function reFillFields(id, target) {
    switch (id) {
        case 'popup':
            profileNameInput.value = nameField.textContent;
            profileDescriptionInput.value = jobField.textContent;
            break;
        case 'popup-photo':
            photoTitleInput.value = "";
            photoLinkInput.value = "";
            break;
        case 'popup-view':
            popupPhotoImg.setAttribute('src', target.getAttribute('src'));
            popupPhotoImg.setAttribute('alt', target.getAttribute('alt'));
            popupPhotoTitle.textContent = target.getAttribute('alt');
            break;
    }
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