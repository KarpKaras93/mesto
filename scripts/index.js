//переменные для добавление карточек и удаления
const elementsList = document.querySelector('.elements');
const elementTemplate = document.querySelector('.element_template').content;
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
const buttonSave = document.querySelector('.popup__save-button');
//переменные для добавления карточек
const popupAddcard = document.querySelector('.popup_type_add');
const buttonAddCard = document.querySelector('.profile__add-button');
//переменные для просмотра карточки
const popupElement = document.querySelector('.popup_type_img');
const photoFull = document.querySelector('.popup__photo');
const photoTitle = document.querySelector('.popup__subtitle');
//переменные открытия/закрытия всех модалок
const popupCloseButtons = document.querySelectorAll('.popup__close-button');

//функции открытия/закрытия модалок
function openPopup(popup) {
  popup.addEventListener('click', closePopupByOverlay);
  popup.classList.add('popup_opened');
};

const closePopupByOverlay = (e) => {
  if (e.target === e.currentTarget) {
    const popup = document.querySelector('.popup_opened')
    closePopup(popup);
  }
};

function closePopup(popup) {
  popup.removeEventListener('click', closePopupByOverlay);
  popup.classList.remove('popup_opened');
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

//функция создания карточки
function createElement(card) {
  const newElement = elementTemplate.querySelector('.element').cloneNode(true);
  const elementPhoto = newElement.querySelector('.element__photo');
  const elementTitle = newElement.querySelector('.element__title');
  elementTitle.textContent = card.name;
  elementPhoto.src = card.link;
  //удаление добавленной карточки
  newElement.querySelector('.element__delete-button').addEventListener('click', () => {
    deleteElement(newElement);
  });
  //лайки
  newElement.querySelector('.element__like-button').addEventListener('click', e => {
    e.target.classList.toggle('element__like-button_active');
  });
  //просмотр карточки
  elementPhoto.addEventListener('click', function () {
    photoFull.src = elementPhoto.src;
    photoTitle.textContent = elementTitle.textContent;
    openPopup(popupElement);
  });
  return newElement;
};

//функция выгрузки карточки
function rendetElement(card) {
  const newElement = createElement(card);
  elementsList.prepend(newElement);
};

cardElements.forEach((card) => {
  createElement(card);
  rendetElement(card);
});

//функция удаления карточек
function deleteElement(element) {
  element.remove();
};

//обработчик добавления новых карточек
formAddCard.addEventListener('submit', (e) => {
  e.preventDefault();
  const card = {
    name: placeName.value,
    link: placeLink.value,
  };
  createElement(card);
  elementsList.append(card);
  rendetElement(card);
  formAddCard.reset();
  closePopup(popupAddcard);
});

//обработчики открытия модалок
buttonEditProfile.addEventListener('click', () => {
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
  openPopup(popupEditProfile);
});

buttonAddCard.addEventListener('click', () => {
  openPopup(popupAddcard);
});


//обработчики закрытия модалок
popupCloseButtons.forEach(button => {
  button.addEventListener('click', () => {
    closePopup(popupEditProfile);
    closePopup(popupAddcard);
    closePopup(popupElement);
  });
});

//обработчик формы редактирования профиля
formEditProfile.addEventListener('submit', handleSubmitEditForm);
