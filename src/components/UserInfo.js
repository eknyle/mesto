export default class UserInfo {
  constructor(
    userNameInputField,
    userDescriptionInputField,
    userNameField,
    userDescriptionField,
    userAvatar
  ) {
    this._userNameInputField = userNameInputField;
    this._userDescriptionInputField = userDescriptionInputField;
    this._userNameField = userNameField;
    this._userDescriptionField = userDescriptionField;
    this._userAvatar = userAvatar;
  }
  getUserInfo() {
    //возвращает объект с данными пользователя.
    //Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
    //записываем данные в формате {[key:<id поля в которое надо записать значение>,value:<значение из поля формы>]}
    return new Map([
      [this._userNameInputField.id, this._userNameField.textContent],
      [
        this._userDescriptionInputField.id,
        this._userDescriptionField.textContent,
      ],
    ]);
  }
  setUserInfo(data) {
    //принимает новые данные пользователя и добавляет их на страницу.
    this._userNameField.textContent = data.get(this._userNameInputField.id);
    this._userDescriptionField.textContent = data.get(
      this._userDescriptionInputField.id
    );
  }
  setUserInfoFromServer(data) {
    this._userNameField.textContent = data.name;
    this._userDescriptionField.textContent = data.about;
    this._userAvatar.setAttribute("src", data.avatar);
  }
}
