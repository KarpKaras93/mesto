const cardElements = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const elementsList = document.querySelector('.elements');
const elementTemplate = document.querySelector('.element_template').content;
const addForm = document.querySelector('.popup-add__form');
const placeName = document.querySelector('.popup__input_type_place');
const placeLink = document.querySelector('.popup__input_type_link');
const addCardElement = document.querySelector('.popup-add__add-button');
const deleteButton = document.querySelector('.delete-button');
const likeButton = document.querySelectorAll('.like-button');

//функция выгрузки карточек из массива
function rendetElement(text) {
  const newElement = elementTemplate.querySelector('.element').cloneNode(true);
  newElement.querySelector('.element__title').innerText = text.name;
  newElement.querySelector('.element__photo').src = text.link;
  elementsList.append(newElement);
  //удаление карточки
  newElement.querySelector('.delete-button').addEventListener('click', () => {
    deleteElement(newElement);
  });
  //лайки
  newElement.querySelector('.like-button').addEventListener('click', e => {
    e.target.classList.toggle('like-button_active');
  });
  //просмотр карточки
  newElement.querySelector('.element__photo').addEventListener('click', function () {
    fullPhoto.src = newElement.querySelector('.element__photo').src;
    photoTitle.textContent = newElement.querySelector('.element__title').textContent;
    openPopupElement();
  });
};

cardElements.forEach(rendetElement);

//модалка просмотра карточки
const popupElement = document.querySelector('.popup-element');
const fullPhoto = document.querySelector('.popup-element__photo');
const photoTitle = document.querySelector('.popup-element__title');

function openPopupElement() {
  popupElement.classList.add('popup_opened');
};

popupElement.addEventListener('click', function (e) {
  if (e.target === e.currentTarget) {
    closePopup();
  }
});

//функция удаления карточек
function deleteElement(element) {
  element.remove();
};

//функция добавления карточки
function createElement(e) {
  e.preventDefault();
  const newElement = elementTemplate.querySelector('.element').cloneNode(true);
  newElement.querySelector('.element__title').innerText = placeName.value;
  newElement.querySelector('.element__photo').src = placeLink.value;
  elementsList.insertAdjacentElement('afterbegin', newElement);
  closePopup();
  //удаление добавленной карточки
  newElement.querySelector('.delete-button').addEventListener('click', () => {
    deleteElement(newElement);
  });
  //лайки
  newElement.querySelector('.like-button').addEventListener('click', e => {
    e.target.classList.toggle('like-button_active');
  });
  //просмотр карточки
  newElement.querySelector('.element__photo').addEventListener('click', function () {
    fullPhoto.src = newElement.querySelector('.element__photo').src;
    photoTitle.textContent = newElement.querySelector('.element__title').textContent;
    openPopupElement();
  });
};

addForm.addEventListener('submit', createElement);

//модалка для добавления карточек
const addButton = document.querySelector('.add-button');
const addPopup = document.querySelector('.popup-add');

function openAddPopup() {
  addPopup.classList.add('popup_opened');
};

addButton.addEventListener('click', openAddPopup);

addPopup.addEventListener('click', function (e) {
  if (e.target === e.currentTarget) {
    closePopup();
  }
});

//модалка редактирования профиля
const editButton = document.querySelector('.edit-button');
const popup = document.querySelector('.popup');

let profileName = document.querySelector('.profile-info__title');
let profileDescription = document.querySelector('.profile-info__subtitle');
const saveButton = document.querySelector('.popup__save-button');

let formElement = document.querySelector('.popup__content');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_description');

function openPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
};

editButton.addEventListener('click', openPopup);

//функция закрытия всех модалок
const popupCloseButton = document.querySelectorAll('.close-button');

function closePopup() {
  popup.classList.remove('popup_opened');
  addPopup.classList.remove('popup_opened');
  popupElement.classList.remove('popup_opened');
};

popupCloseButton.forEach(button => {
  button.addEventListener('click', function () {
    closePopup();
  });
});

popup.addEventListener('click', function (e) {
  if (e.target === e.currentTarget) {
    closePopup();
  }
});

//функция редактирования профиля
function editProfile() {
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
};

function formSubmitHandler(evt) {
  evt.preventDefault();
  editProfile();
  closePopup();
};

formElement.addEventListener('submit', formSubmitHandler);




