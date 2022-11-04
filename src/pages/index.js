import * as fields from "../components/data.js";
import { Card } from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PicturePopup.js";
import ConfirmPopup from "../components/ConfirmPopup.js";
import UserInfo from "../components/UserInfo.js";

import { FormValidator } from "../components/FormValidator.js";
import Section from "../components/Section.js";
import Api from "../components/Api.js";
import "./index.css";

//вспомогательные функции
let currentUserId = "";

function setUser(data) {
  currentUserId = data._id;
}

function isMyCardFunction(ownerId) {
  return currentUserId === ownerId ? true : false;
}
function renderLoading(isLoading, text, changeTextMethod) {
  if (isLoading) {
    changeTextMethod(text);
  } else {
    changeTextMethod(text);
  }
}

//работа с данными пользователя
const userInfo = new UserInfo(
  fields.nameField,
  fields.jobField,
  fields.avatarField
);
//работа с API
const headers = new Headers({
  "Content-Type": "application/json",
  authorization: "c37f9a76-7d14-4e84-b759-844312e2f497",
});
const baseUrlApi = "https://mesto.nomoreparties.co/v1/cohort-52";
const api = new Api(headers, baseUrlApi);

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userInfoResult, initialCardsResult]) => {
    setUser(userInfoResult);
    userInfo.setUserInfoFromServer(userInfoResult);
    setInitialCards(initialCardsResult);
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });

const saveAvatarFormEvent = (fieldsValues, closeEventHandler) => {
  renderLoading(
    true,
    "Сохранение...",
    popupAvatar.renderSubmitButtonText.bind(popupAvatar)
  );

  api
    .updateAvatar(fieldsValues[fields.avatarLinkInput.id])
    .then((data) => {
      userInfo.setUserInfoFromServer(data);
      closeEventHandler();
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .finally(() => {
      renderLoading(
        false,
        "Сохранить",
        popupAvatar.renderSubmitButtonText.bind(popupAvatar)
      );
    });
};
const likeCardEvent = (evt, cardId, updateLikesNumber) => {
  evt.preventDefault();

  api
    .likeCard(cardId)
    .then((data) => {
      //обновить карточку после лайка

      updateLikesNumber(data);
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
};
const dislikeCardEvent = (evt, cardId, updateLikesNumber) => {
  evt.preventDefault();

  api
    .dislikeCard(cardId)
    .then((data) => {
      //обновить карточку после лайка

      updateLikesNumber(data);
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
};
const deleteCardEvent = (evt, cardId, deleteCardEvent, closeEventHandler) => {
  evt.preventDefault();

  api
    .deleteCard(cardId)
    .then((data) => {
      deleteCardEvent();
      closeEventHandler();
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
};
//сохранить данные формы добавления фото
const savePhotoFormEvent = (fieldsValues, closeEventHandler) => {
  renderLoading(
    true,
    "Сохранение...",
    photoFormPopup.renderSubmitButtonText.bind(photoFormPopup)
  );
  const item = {
    name: fieldsValues[fields.photoTitleInput.id],
    link: fieldsValues[fields.photoLinkInput.id],
  };
  api
    .addNewCard(item.name, item.link)
    .then((data) => {
      section.addItem(createCard(data, false));
      closeEventHandler();
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .finally(() => {
      renderLoading(
        false,
        "Создать",
        photoFormPopup.renderSubmitButtonText.bind(photoFormPopup)
      );
    });
};

//сохранить данные формы редактироивания профиля
const saveProfileFormEvent = (fieldsValues, closeEventHandler) => {
  renderLoading(
    true,
    "Сохранение...",
    userFormPopup.renderSubmitButtonText.bind(userFormPopup)
  );
  api
    .updateUserInfo(
      fieldsValues[fields.profileNameInput.id],
      fieldsValues[fields.profileDescriptionInput.id]
    )
    .then((data) => {
      userInfo.setUserInfoFromServer(data);
      closeEventHandler();
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .finally(() => {
      renderLoading(
        false,
        "Сохранить",
        userFormPopup.renderSubmitButtonText.bind(userFormPopup)
      );
    });
};
//работа с попапами
const avatarValidation = new FormValidator(
  fields.avatarForm,
  fields.validationObject
);
const profileValidator = new FormValidator(
  fields.profileForm,
  fields.validationObject
);
const photoAddFormValidator = new FormValidator(
  fields.photoAddForm,
  fields.validationObject
);

const popupAvatar = new PopupWithForm(fields.popupAvatar, saveAvatarFormEvent);
avatarValidation.enableValidation();
popupAvatar.setEventListeners();

fields.popupAvatarContainer.addEventListener("click", (evt) => {
  avatarValidation.toggleButtonState();
  popupAvatar.open();
});

const userFormPopup = new PopupWithForm(
  fields.popupProfile,
  saveProfileFormEvent
);
userFormPopup.setEventListeners();
profileValidator.enableValidation();

const popupWithImage = new PopupWithImage(
  fields.popupView,
  fields.popupViewCloseButton
);
popupWithImage.setEventListeners();

function openViewPopup(imageLink, imageTitle) {
  popupWithImage.open(imageLink, imageTitle);
}
const confirmPopup = new ConfirmPopup(fields.popupConfirm, deleteCardEvent);
confirmPopup.setEventListeners();
function openConfirmDeletePopup(cardid, deleteCard) {
  confirmPopup.open(cardid, deleteCard);
}
const photoFormPopup = new PopupWithForm(
  fields.popupPhoto,
  savePhotoFormEvent,
  null,
  photoAddFormValidator
);
photoFormPopup.setEventListeners();
photoAddFormValidator.enableValidation();

fields.popupProfileOpenButton.addEventListener("click", () => {
  const data = userInfo.getUserInfo();

  userFormPopup.inputList.forEach((element) => {
    element.value = data[element.id];
    profileValidator.hideInputError(element);
  });

  profileValidator.toggleButtonState();

  userFormPopup.open();
});

fields.popupAddPhotoAddButton.addEventListener("click", (event) => {
  photoAddFormValidator.toggleButtonState();

  photoFormPopup.open();
});

const section = new Section(
  {
    renderer: (card) => {
      const isLiked =
        card.likes.findIndex((el) => el._id === currentUserId) >= 0
          ? true
          : false;

      return createCard(card, isLiked);
    },
  },
  fields.elementsContainer
);
function setInitialCards(array) {
  array.sort((a, b) => {
    if (a.createdAt <= b.createdAt) {
      return -1;
    }
    if (a.createdAt > b.createdAt) {
      return 1;
    }
    return 0;
  });

  section.generateItems(array);
}

function createCard(item, isLiked) {
  const card = new Card(
    item,
    openViewPopup,
    fields.elementTemplate,
    isMyCardFunction(item.owner._id),
    likeCardEvent,
    dislikeCardEvent,
    isLiked,
    openConfirmDeletePopup
  );
  return card.generateCard();
}
