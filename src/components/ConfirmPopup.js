import Popup from "./Popup.js";
export default class ConfirmPopup extends Popup {
  constructor(popup, CloseButton, SaveButton, deleteCardEvent) {
    super(popup, CloseButton);
    this._saveButton = SaveButton;
    this._deleteCardEvent = deleteCardEvent;
  }

  setEventListeners() {
    this._saveButton.addEventListener("click", (evt) => {
      this._deleteCardEvent(evt, this._cardId);
      super.close();
    });
  }
  open(cardId) {
    this._cardId = cardId;
    super.open();
  }
}
