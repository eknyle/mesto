export default class Api {
  constructor(headers, url) {
    this._headers = headers;
    this._baseUrl = url;
  }
  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  getInitialCards() {
    return fetch(this._baseUrl, {
      headers: this._headers,
    }).then((res) => {
      return this._getResponseData(res);
    });
  }
  addNewCard(name, link) {
    return fetch(this._baseUrl, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  likeCard(cardId) {
    return fetch(`${this._baseUrl}/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => {
      return this._getResponseData(res);
    });
  }
  dislikeCard(cardId) {
    return fetch(`${this._baseUrl}/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  getUserInfo() {
    return fetch("https://nomoreparties.co/v1/cohort-52/users/me", {
      headers: this._headers,
    }).then((res) => {
      return this._getResponseData(res);
    });
  }
  updateAvatar(url) {
    return fetch(
      "https://mesto.nomoreparties.co/v1/cohort-52/users/me/avatar",
      {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          avatar: url,
        }),
      }
    ).then((res) => {
      return this._getResponseData(res);
    });
  }
  updateUserInfo(name, about) {
    return fetch("https://mesto.nomoreparties.co/v1/cohort-52/users/me", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }
}
