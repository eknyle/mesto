export class Card {
  constructor(
    data,
    openViewPopup,
    elementTemplate,
    isMyCard,
    likeCardEvent,
    dislikeCardEvent,
    isLiked,
    openConfirmDeletePopup
  ) {
    this._id = data._id;
    this._name = data.name;
    this._link = data.link;
    this._likeNumber = data.likes.length;
    this._isLiked = isLiked;
    this._elementTemplate = elementTemplate;
    this._openViewPopup = openViewPopup;
    this._isMyCard = isMyCard;
    this._likeCardEvent = likeCardEvent;
    this._dislikeCardEvent = dislikeCardEvent;
    this._openConfirmDeletePopup = openConfirmDeletePopup;
  }
  _getTemplate() {
    const card = this._elementTemplate
      .querySelector(".element")
      .cloneNode(true);
    card.id = this._id;
    return card;
  }

  _setEventListener() {
    this._image.addEventListener("click", (event) => {
      this._openViewPopup(event);
    });
    this._element
      .querySelector(".element__like")
      .addEventListener("click", this._likeCard.bind(this));
    if (this._isMyCard) {
      this._element
        .querySelector(".element__delete")
        .addEventListener("click", (evt) => {
          this._openConfirmDeletePopup(this._id);
        });
    }
  }

  /* deleteCard(evt) {
    this._element.remove();
    this._element = null;
  } */
  _likeCard(evt) {
    if (evt.target.classList.contains("element_liked")) {
      this._dislikeCardEvent(evt, this._id);
    } else {
      this._likeCardEvent(evt, this._id);
    }
  }

  generateCard() {
    this._element = this._getTemplate();
    this._image = this._element.querySelector(".element__image");
    this._image.setAttribute("src", this._link);
    this._image.setAttribute("alt", this._name);
    if (!this._isMyCard) {
      this._element
        .querySelector(".element__delete")
        .classList.add("element__delete_hidden");
    }
    if (this._isLiked) {
      this._element
        .querySelector(".element__like")
        .classList.add("element_liked");
    }

    this._element.querySelector(".element__like-number").textContent =
      this._likeNumber;
    this._element.querySelector(".element__title").textContent = this._name;
    this._setEventListener();
    return this._element;
  }
}
