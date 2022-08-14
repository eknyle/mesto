
//назначаем обработчики для кнопки открыть popup
let editButton = document.querySelector(".profile__edit-button");
editButton.addEventListener('click', popupOpen);

//находим поля имя и описание деятельности
let nameField = document.querySelector(".profile__title");
let jobField = document.querySelector(".profile__description");

// Находим форму в DOM
let formElement = document.querySelector("#profile-info");
// Находим поля формы в DOM
let nameInput = formElement.querySelector(".form__input_type_name")
let jobInput = formElement.querySelector(".form__input_type_description")

//назначаем обработчики для кнопки закрыть popup
let closeButton = document.querySelector(".popup__container-close");
closeButton.addEventListener('click', popupClose);

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

let popup = document.querySelector(".popup");
function popupOpen() {
    // проверяем  классы
    if (!popup.classList.contains('popup_opened')) {
        popup.classList.add('popup_opened');
    }
    //назначае поля редактирования
    nameInput.value = nameField.textContent;
    jobInput.value = jobField.textContent;
}

function popupClose() {
    //проверяем классы
    if (popup.classList.contains('popup_opened')) {
        popup.classList.remove('popup_opened');
    }
    //возвращаем значения полей
    nameInput.value = nameField.textContent;
    jobInput.value = jobField.textContent;
}
function formSubmitHandler(evt) {
    evt.preventDefault();
    nameField.textContent = nameInput.value;
    jobField.textContent = jobInput.value;
    popupClose();
}


