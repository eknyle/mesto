import * as fields from "../components/Data.js";
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
let currentUserAvatar = "";
function setUser(data) {
  currentUserId = data._id;
  currentUserAvatar = data.avatar;
}
function getCurrentUserAvatar() {
  return new Map([[fields.avatarLinkInput.id, currentUserAvatar]]);
}
function isMyCardFunction(ownerId) {
  return currentUserId === ownerId ? true : false;
}
function renderLoading(isLoading, button) {
  if (isLoading) {
    button.textContent = "Сохранение...";
  } else {
    button.textContent = "Сохранить";
  }
}
function updateLikeCount(data, element) {
  element.textContent = data.likes.length;
}
//работа с данными пользователя
const userInfo = new UserInfo(
  fields.profileNameInput,
  fields.profileDescriptionInput,
  fields.nameField,
  fields.jobField,
  fields.avatarField
);
//работа с API
const api = new Api();
api
  .getUserInfo()
  .then((result) => {
    setUser(result);
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
const saveAvatarFormEvent = (evt, fieldsValues) => {
  evt.preventDefault();
  renderLoading(true, evt.submitter);

  api
    .updateAvatar(fieldsValues.get(fields.avatarLinkInput.id))
    .then((data) => {
      userInfo.setUserInfoFromServer(data);
      setUser(data);
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .finally(() => {
      renderLoading(false, evt.submitter);
    });
};
const likeCardEvent = (evt, cardId) => {
  evt.preventDefault();

  api
    .likeCard(cardId)
    .then((data) => {
      //обновить карточку после лайка

      evt.target.classList.toggle("element_liked");
      const element = evt.target.parentNode.querySelector(
        ".element__like-number"
      );
      updateLikeCount(data, element);
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
};
const dislikeCardEvent = (evt, cardId) => {
  evt.preventDefault();

  api
    .dislikeCard(cardId)
    .then((data) => {
      //обновить карточку после лайка

      const element = evt.target.parentNode.querySelector(
        ".element__like-number"
      );
      updateLikeCount(data, element);
      evt.target.classList.toggle("element_liked");
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
};
const deleteCardEvent = (evt, cardId) => {
  evt.preventDefault();

  api
    .deleteCard(cardId)
    .then((data) => {
      document.getElementById(`${cardId}`).remove();
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
};
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
      newItemSection.addItem(createCard(data, false));
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
};

//сохранить данные формы редактироивания профиля
const saveProfileFormEvent = (evt, fieldsValues) => {
  evt.preventDefault();
  renderLoading(true, evt.submitter);
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
    })
    .finally(() => {
      renderLoading(false, evt.submitter);
    });
};
//работа с попапами
const avatarValidation = new FormValidator(fields.validationAvatar);
avatarValidation.enableValidation();
const popupAvatar = new PopupWithForm(
  fields.popupAvatar,
  fields.avatarForm,
  saveAvatarFormEvent,
  [fields.avatarLinkInput],
  getCurrentUserAvatar,
  fields.popupAvatarCloseButton,
  avatarValidation,
  fields.avatarSaveButton
);
popupAvatar.setEventListeners();
fields.popupAvatarContainer.addEventListener("click", (evt) => {
  popupAvatar.open();
});

const profileValidator = new FormValidator(fields.validationProfile);
const photoAddFormValidator = new FormValidator(fields.validationPhoto);

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
const confirmPopup = new ConfirmPopup(
  fields.popupConfirm,
  fields.popupConfirmCloseButton,
  fields.popupConfirmSaveButton,
  deleteCardEvent
);
confirmPopup.setEventListeners();
function openConfirmDeletePopup(cardid) {
  confirmPopup.open(cardid);
}
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

function setInitialCards(array) {
  const section = new Section(
    {
      items: array,
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
  section.generateItems();
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
const newItemSection = new Section(
  { items: null, renderer: null },
  fields.elementsContainer
);
