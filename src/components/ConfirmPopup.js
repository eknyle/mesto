import Popup from "./Popup.js";
export default class ConfirmPopup extends Popup {
  constructor(popup, deleteCardEvent) {
    super(popup);
    this._deleteCardEvent = deleteCardEvent;
    this._saveButton = this._popup.querySelector(".popup__save");
  }

  setEventListeners() {
    super.setEventListeners();
    this._saveButton.addEventListener("click", (evt) => {
      this._deleteCardEvent(
        evt,
        this._cardId,
        this._deleteCardCallback,
        this.close.bind(this)
      );
    });
  }
  close() {
    super.close();
  }

  open(cardId, deleteCard) {
    this._cardId = cardId;
    this._deleteCardCallback = deleteCard;
    super.open();
  }
}
