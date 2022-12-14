export default class UserInfo {
  constructor(userNameField, userDescriptionField, userAvatar) {
    this._userNameField = document.querySelector(userNameField);
    this._userDescriptionField = document.querySelector(userDescriptionField);
    this._userAvatar = document.querySelector(userAvatar);
  }
  getUserInfo() {
    //возвращает объект с данными пользователя.
    const info = {};
    info[
      this._userNameField.id.slice(0, this._userNameField.id.indexOf("-text"))
    ] = this._userNameField.textContent;
    info[
      this._userDescriptionField.id.slice(
        0,
        this._userDescriptionField.id.indexOf("-text")
      )
    ] = this._userDescriptionField.textContent;

    return info;
  }
  /*   setUserInfo(data) {
    //принимает новые данные пользователя и добавляет их на страницу.
    this._userNameField.textContent = data[this._userNameField.id];
    this._userDescriptionField.textContent =
      data[this._userDescriptionField.id];
  } */
  setUserInfoFromServer(data) {
    this._userNameField.textContent = data.name;
    this._userDescriptionField.textContent = data.about;
    this._userAvatar.setAttribute("src", data.avatar);
  }
}
