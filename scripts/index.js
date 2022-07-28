import { cardElements } from './cards.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js'

//переменные для добавление карточек и удаления
const elementsList = document.querySelector('.elements');
const formAddCard = document.querySelector('.popup__form_type_add');
const placeName = document.querySelector('.popup__input_type_place');
const placeLink = document.querySelector('.popup__input_type_link');
//переменные для редактирования профиля
const popupEditProfile = document.querySelector('.popup_type_edit');
const buttonEditProfile = document.querySelector('.profile-info__edit-button');
const profileName = document.querySelector('.profile-info__title');
const profileDescription = document.querySelector('.profile-info__subtitle');
const formEditProfile = document.querySelector('.popup__form_type_edit');
const inputName = document.querySelector('.popup__input_type_name');
const inputDescription = document.querySelector('.popup__input_type_description');
//переменные для добавления карточек
const popupAddcard = document.querySelector('.popup_type_add');
const buttonAddCard = document.querySelector('.profile__add-button');
//переменные для просмотра карточки
const popupElement = document.querySelector('.popup_type_img');
const photoFull = document.querySelector('.popup__photo');
const photoTitle = document.querySelector('.popup__subtitle');
//переменные открытия/закрытия всех модалок
const popupCloseButtons = document.querySelectorAll('.popup__close-button');

const params = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_active'
};

//валидация форм
const formProfileInfo = new FormValidator(params, formEditProfile);
formProfileInfo.enableValidation();

const formCardAdd = new FormValidator(params, formAddCard);
formCardAdd.enableValidation();


//функции открытия/закрытия модалок
function openPopup(popup) {
  document.addEventListener('keydown', closePopupByEsc);
  popup.addEventListener('mousedown', closePopupByOverlay);
  popup.classList.add('popup_opened');
};

const closePopupByEsc = (e) => {
  if (e.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
};

const closePopupByOverlay = (e) => {
  if (e.target === e.currentTarget) {
    closePopup(e.currentTarget);
  }
};

function closePopup(popup) {
  document.removeEventListener('keydown', closePopupByEsc);
  popup.removeEventListener('mousedown', closePopupByOverlay);
  popup.classList.remove('popup_opened');
};

const callbackPhotoClick = (name, link) => {
  photoFull.src = link;
  photoFull.alt = name;
  photoTitle.textContent = name;
  openPopup(popupElement);
};

//функция редактирования профиля
function editProfile() {
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
};

function handleSubmitEditForm(evt) {
  evt.preventDefault();
  editProfile();
  closePopup(popupEditProfile);
};

//функции выгрузки и создания карточкек
const renderElement = (card) => {
  elementsList.prepend(card)
}

const createElement = (item) => {
  const card = new Card(item, '.element_template', callbackPhotoClick);
  const newElement = card.generateCard();
  return newElement
}

cardElements.forEach((card) => {
  const newElement = createElement(card);
  renderElement(newElement);
});

//обработчик добавления новых карточек
formAddCard.addEventListener('submit', (e) => {
  e.preventDefault();
  const item = {
    name: placeName.value,
    link: placeLink.value,
  };
  const newElement = createElement(item);
  renderElement(newElement);
  formAddCard.reset();
  closePopup(popupAddcard);
});

//обработчики открытия модалок
buttonEditProfile.addEventListener('click', () => {
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
  openPopup(popupEditProfile);
  formProfileInfo.resetValidation();
});

buttonAddCard.addEventListener('click', () => {
  formAddCard.reset();
  formCardAdd.resetValidation();

  openPopup(popupAddcard);
});

//обработчики закрытия модалок
popupCloseButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    const popup = e.target.closest('.popup');
    closePopup(popup);
  });
});

//обработчик формы редактирования профиля
formEditProfile.addEventListener('submit', handleSubmitEditForm);
