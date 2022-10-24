import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(popup, target, popupPhotoImg, popupPhotoTitle, CloseButton) {
    super(popup);
    this._eventTarget = target;
    this._closeButton = CloseButton;
    this._popupPhotoImg = popupPhotoImg;
    this._popupPhotoTitle = popupPhotoTitle;
  }
  _addEventListeners() {
    super.setEventListeners();
    this._closeButton.addEventListener("click", () => {
      super.close();
    });
  }
  open() {
    //нужно вставлять в попап картинку с src изображения и подписью к картинке

    this._popupPhotoImg.setAttribute(
      "src",
      this._eventTarget.getAttribute("src")
    );
    this._popupPhotoImg.setAttribute(
      "alt",
      this._eventTarget.getAttribute("alt")
    );
    this._popupPhotoTitle.textContent = this._eventTarget.getAttribute("alt");

    super.open();
    this._addEventListeners();
  }
}
