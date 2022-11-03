import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this._image = document.querySelector(".popup__image");
    this._title = document.querySelector(".popup__image-title");
  }
  setEventListeners() {
    super.setEventListeners();
  }
  open(popupPhotoImg, popupPhotoTitle) {
    //нужно вставлять в попап картинку с src изображения и подписью к картинке

    this._image.setAttribute("src", popupPhotoImg);
    this._image.setAttribute("alt", popupPhotoTitle);
    this._title.textContent = popupPhotoTitle;

    super.open();
  }
}
