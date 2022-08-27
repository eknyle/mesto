
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
let elementsContainer = document.querySelector(".elements");
initCards(initialCards);

//назначаем обработчики для кнопки открыть popup
let editButton = document.querySelector(".profile__edit-button");
editButton.addEventListener('click', popupOpen);

//назначаем обработчик к кнопке добавить фото
let addButton = document.querySelector(".profile__add-button");
addButton.addEventListener('click', popupAddPhoto);

//находим поля имя и описание деятельности
let nameField = document.querySelector(".profile__title");
let jobField = document.querySelector(".profile__description");

// Находим форму в DOM
let formElement = document.querySelector("#profile-info");
// Находим поля формы в DOM
let firstInput = formElement.querySelector(".form__input_type_name")
let secondInput = formElement.querySelector(".form__input_type_description")
let saveButton = formElement.querySelector(".form__save");

//назначаем обработчики для кнопки закрыть popup
let closeButton = document.querySelector(".popup__container-close");
closeButton.addEventListener('click', popupClose);

//назначаем обработчики для кнопки закрыть popup-photo
let closePhotoButton = document.querySelector(".popup-photo__close");
closePhotoButton.addEventListener('click', popupPhotoClose);


let popup = document.querySelector(".popup");
let popupPhoto = document.querySelector(".popup-photo");
let popupPhotoImg = document.querySelector(".popup-photo__image");
let popupPhotoTitle = document.querySelector(".popup-photo__title")

const popupTitle = document.querySelector(".popup__container-title");

//подготовка попапа в зависимости от режима редактирования(профиль,фото)
function reFillFields(value) {
    if (value === "profile") {
        popupTitle.textContent = "Редактировать профиль";
        firstInput.setAttribute("placeholder", "Имя");
        secondInput.setAttribute("placeholder", "Вид деятельности");
        firstInput.value = nameField.textContent;
        secondInput.value = jobField.textContent;
        saveButton.setAttribute("title", "Сохранить");
        saveButton.textContent = "Сохранить";
        // Прикрепляем обработчик к форме:
        formElement.removeEventListener('submit', formPhotoSubmitHandler);
        formElement.addEventListener('submit', formSubmitHandler);
    } else {
        popupTitle.textContent = "Новое место";
        firstInput.setAttribute("placeholder", "Название");
        secondInput.setAttribute("placeholder", "Ссылка на картинку");
        firstInput.value = "";
        secondInput.value = "";
        saveButton.setAttribute("title", "Создать");
        saveButton.textContent = "Создать";
        // Прикрепляем обработчик к форме:
        formElement.removeEventListener('submit', formSubmitHandler);
        formElement.addEventListener('submit', formPhotoSubmitHandler);
    }
}
//подготовить попап для добавления фото и открыть его
function popupAddPhoto() {
    reFillFields("photo");
    popup.classList.add('popup_opened');
}

//открыть попап фото
function popupPhotoOpen(evt) {
    popupPhotoImg.setAttribute('src', evt.target.getAttribute('src'));
    popupPhotoImg.setAttribute('alt', evt.target.getAttribute('alt'));
    popupPhotoTitle.textContent = evt.target.getAttribute('alt');
    popupPhoto.classList.add('popup-photo_opened');
}
//закрыть попап
function popupPhotoClose() {
    popupPhoto.classList.remove('popup-photo_opened');
}

//открыть попап профиля и предзаполнить поля на форме
function popupOpen() {
    reFillFields("profile");
    popup.classList.add('popup_opened');
}
//закрыть попап профиля
function popupClose() {
    //проверяем классы
    popup.classList.remove('popup_opened');
}
//сохранить данные формы в поля на странице
function formSubmitHandler(evt) {
    evt.preventDefault();
    nameField.textContent = firstInput.value;
    jobField.textContent = secondInput.value;
    popupClose();
}
//сохранить данные формы добавления фото
function formPhotoSubmitHandler(evt) {
    evt.preventDefault();
    addCard(firstInput.value, secondInput.value);
    popupClose();
}

//удаляем карточки
function deleteButtonClickHandler(evt) {
    evt.preventDefault();
    elementsContainer.removeChild(evt.target.parentElement);
}
//сохраняем лайк картинки
function likeButtonClickHandler(evt) {
    evt.preventDefault();
    evt.target.classList.toggle('element_liked');
}

//добавлем карточку на страницу
function addCard(name, link) {
    const elementTemplate = document.querySelector('#element-template').content;
    const element = elementTemplate.querySelector('.element').cloneNode(true);


    const image = element.querySelector('.element__image');
    image.setAttribute('src', link);
    image.setAttribute('alt', name);
    image.addEventListener('click', popupPhotoOpen);

    element.querySelector('.element__title').textContent = name;
    const likeButton = element.querySelector('.element__like');
    likeButton.addEventListener('click', likeButtonClickHandler);
    const deleteButton = element.querySelector('.element__delete');
    deleteButton.addEventListener('click', deleteButtonClickHandler);

    elementsContainer.prepend(element);
}

//инициируем массив карточек при загрузке страницы
function initCards(initialCards) {
    for (let i = 0; i < initialCards.length; i++) {
        addCard(initialCards[i].name, initialCards[i].link);
    }
}