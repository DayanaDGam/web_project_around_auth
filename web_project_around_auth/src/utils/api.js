class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
    this._token = null;
  }

  setToken(token) {
    this._token = token;
  }

  _getHeaders() {
    const headers = {
      "Content-Type": "application/json",
    };

    if (this._token) {
      headers.Authorization = `Bearer ${this._token}`;
    }

    return headers;
  }

  _checkResponse(res) {
    if (res.ok) return res.json();
    return res.json().catch(() => null).then((data) => {
      const msg = data?.message || data?.error || `Error: ${res.status}`;
      return Promise.reject(msg);
    });
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._getHeaders(),
    }).then(this._checkResponse);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._getHeaders(),
    }).then(this._checkResponse);
  }

  addNewCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._getHeaders(),
      body: JSON.stringify({ name, link }),
    }).then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._getHeaders(),
    }).then(this._checkResponse);
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: isLiked ? "PUT" : "DELETE",
      headers: this._getHeaders(),
    }).then(this._checkResponse);
  }

  updateUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify({ name, about }),
    }).then(this._checkResponse);
  }

  updateAvatar(avatarUrl) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify({ avatar: avatarUrl }),
    }).then(this._checkResponse);
  }
}

export const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
});
