export class Card {
  constructor(data, openViewPopup, elementTemplate) {
    this._name = data.name;
    this._link = data.link;
    this._elementTemplate = elementTemplate;
    this._openViewPopup = openViewPopup;
  }
  _getTemplate() {
    const card = this._elementTemplate
      .querySelector(".element")
      .cloneNode(true);
    return card;
  }

  _setEventListener() {
    this._image.addEventListener("click", (event) => {
      this._openViewPopup(event);
    });
    this._element
      .querySelector(".element__like")
      .addEventListener("click", this._likeCard.bind(this));
    this._element
      .querySelector(".element__delete")
      .addEventListener("click", this._deleteCard.bind(this));
  }

  _deleteCard(evt) {
    this._element.remove();
    this._element = null;
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
    this._setEventListener();
    return this._element;
  }
}
