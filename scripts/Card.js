export class Card {
  constructor(data, cardSelector, callbackPhotoClick) {
    this._title = data.name;
    this._photo = data.link;
    this._cardSelector = cardSelector;
    this._callbackPhotoClick = callbackPhotoClick;
  };

  _getTemplate() {
    const cardElement = this._cardSelector.querySelector('.element').cloneNode(true);

    return cardElement;
  };

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.element__photo').src = this._photo;
    this._element.querySelector('.element__photo').alt = this._title;
    this._element.querySelector('.element__title').textContent = this._title;

    return this._element;
  };

  _setEventListeners() {
    this._element.querySelector('.element__delete-button').addEventListener('click', () => {
      this._element.remove();
    });

    this._element.querySelector('.element__like-button').addEventListener('click', e => {
      e.target.classList.toggle('element__like-button_active');
    });

    this._element.querySelector('.element__photo').addEventListener('click', () => {
      this._callbackPhotoClick(this._title, this._photo);
    });
  }
};


