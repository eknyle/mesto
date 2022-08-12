
//назначаем обработчики для кнопки открыть popup
let editButton=document.querySelector(".profile__edit-button");
editButton.addEventListener('click',popupOpenClose);

//находим поля имя и описание деятельности
let nameField=document.querySelector(".profile__title");
let jobField=document.querySelector(".profile__description");

// Находим форму в DOM
let formElement = document.querySelector(".form_popup");
// Находим поля формы в DOM
let nameInput = formElement.querySelector(".form__name_popup")
let jobInput = formElement.querySelector(".form__description_popup")

//назначаем обработчики для кнопки закрыть popup
let closeButton=document.querySelector(".popup__container-close");
closeButton.addEventListener('click',popupOpenClose);

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler); 

function popupOpenClose(){
    //получаем попап и проверяем его классы
    let popup=document.querySelector(".popup");
    popup.classList.toggle('popup_opened');
    //возвращаем поля редактирования в исходное состояние
    nameField.value=nameField.textContent;
    jobInput.value=jobField.textContent;
}
function formSubmitHandler (evt) {
    evt.preventDefault(); 
    let popup=document.querySelector(".popup");
    popup.classList.toggle('popup_opened');
    nameField.textContent=nameInput.value;
    jobField.textContent=jobInput.value;
}


