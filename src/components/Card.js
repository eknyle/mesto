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
    const elementTemplate = document.querySelector(
      this._elementTemplate
    ).content;
    const card = elementTemplate.querySelector(".element").cloneNode(true);
    card.id = this._id;
    return card;
  }

  _setEventListener() {
    this._image.addEventListener("click", () => {
      this._openViewPopup(this._link, this._name);
    });
    this._element
      .querySelector(".element__like")
      .addEventListener("click", this._likeCard.bind(this));
    if (this._isMyCard) {
      this._element
        .querySelector(".element__delete")
        .addEventListener("click", (evt) => {
          this._openConfirmDeletePopup(this._id, this.deleteCard.bind(this));
        });
    }
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _likeCard(evt) {
    if (evt.target.classList.contains("element_liked")) {
      this._dislikeCardEvent(evt, this._id, this.updateLikesNumber.bind(this));
    } else {
      this._likeCardEvent(evt, this._id, this.updateLikesNumber.bind(this));
    }
  }
  updateLikesNumber(data) {
    this._likesNumberElement = this._element.querySelector(
      ".element__like-number"
    );
    this._likesNumberElement.textContent = data.likes.length;

    this._element
      .querySelector(".element__like")
      .classList.toggle("element_liked");
  }
  generateCard() {
    this._element = this._getTemplate();
    this._image = this._element.querySelector(".element__image");
    this._image.setAttribute("src", this._link);
    this._image.setAttribute("alt", this._name);
    this._likesNumberElement = this._element.querySelector(
      ".element__like-number"
    );

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

    this._likesNumberElement.textContent = this._likeNumber;
    this._element.querySelector(".element__title").textContent = this._name;
    this._setEventListener();
    return this._element;
  }
}
