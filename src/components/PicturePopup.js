import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(popup, CloseButton) {
    super(popup, CloseButton);
  }
  addEventListeners() {}
  open(target, popupPhotoImg, popupPhotoTitle) {
    //нужно вставлять в попап картинку с src изображения и подписью к картинке

    popupPhotoImg.setAttribute("src", target.getAttribute("src"));
    popupPhotoImg.setAttribute("alt", target.getAttribute("alt"));
    popupPhotoTitle.textContent = target.getAttribute("alt");

    super.open();
  }
}
