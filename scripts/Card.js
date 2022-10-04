import * as fields from "./Data.js";

export class Card {
  constructor(data, openViewPopup) {
    this._name = data.name;
    this._link = data.link;
    this._openViewPopup = openViewPopup;
  }
  _getTemplate() {
    const card = fields.elementTemplate
      .querySelector(".element")
      .cloneNode(true);
    return card;
  }

  _setEventListener() {
    this._image.addEventListener("click", (event) => {
      const photoViewPopup = this._openViewPopup(
        event.target,
        fields.photoViewPopupSelector,
        fields.photoViewPopupObj
      );
      photoViewPopup.open();
    });
  }

  _deleteCard(evt) {
    fields.elementsContainer.removeChild(evt.target.parentElement);
  }
  _likeCard(evt) {
    evt.target.classList.toggle("element_liked");
  }

  generateCard() {
    this._element = this._getTemplate();
    this._image = this._element.querySelector(".element__image");
    this._image.setAttribute("src", this._link);
    this._image.setAttribute("alt", this._name);

    this._element.querySelector(".element__title").textContent = this._name;
    this._element
      .querySelector(".element__like")
      .addEventListener("click", this._likeCard);
    this._element
      .querySelector(".element__delete")
      .addEventListener("click", this._deleteCard);
    this._setEventListener();
    fields.elementsContainer.prepend(this._element);
  }
}
