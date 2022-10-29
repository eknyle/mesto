export default class Api {
  constructor(options) {
    this.url = "https://mesto.nomoreparties.co/v1/cohort-52/cards";
    this.authorization = "c37f9a76-7d14-4e84-b759-844312e2f497";
    this.userUrl = "https://nomoreparties.co/v1/cohort-52/users/me";
    this.updateUserUrl = "https://mesto.nomoreparties.co/v1/cohort-52/users/me";
  }

  getInitialCards() {
    return fetch(this.url, {
      headers: {
        authorization: this.authorization,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
  addNewCard(name, link) {
    return fetch(this.url, {
      method: "POST",
      headers: {
        authorization: this.authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
  deleteCard(cardId) {
    //еще не реализовано
    /* return fetch(`https://mesto.nomoreparties.co/v1/cohortId/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this.authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    }); */
  }

  getUserInfo() {
    return fetch(this.userUrl, {
      headers: {
        authorization: this.authorization,
        "Content-Type": "application/json",
        method: "GET",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  updateUserInfo(name, about) {
    return fetch(this.updateUserUrl, {
      method: "PATCH",
      headers: {
        authorization: this.authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
}
/* 
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-42",
  headers: {
    authorization: "c56e30dc-2883-4270-a59e-b2f7bae969c6",
    "Content-Type": "application/json",
  },
}); */
