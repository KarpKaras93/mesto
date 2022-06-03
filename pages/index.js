const editButton = document.querySelector('.edit-button');
const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close-button');

let profileName = document.querySelector('.profile-info__title');
let profileDescription = document.querySelector('.profile-info__subtitle');
const saveButton = document.querySelector('.popup__save-button');
// Находим форму в DOM
let formElement = document.querySelector('.popup__content');
let nameInput = document.querySelector('.popup__input-name');
let jobInput = document.querySelector('.popup__input-description');

function openPopup() {
  popup.classList.add('popup_opened');
};

function closePopup() {
  popup.classList.remove('popup_opened');
};

editButton.addEventListener('click', function() {
  openPopup();
});

popupCloseButton.addEventListener('click', function() {
  closePopup();
  notEditProfile();
});

popup.addEventListener('click', function(e) {
  if (e.target === e.currentTarget) {
  closePopup();
  notEditProfile();
  }
});

function editProfile() {
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
};

function notEditProfile() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
};

saveButton.addEventListener('click', function() {
  editProfile();
  closePopup();
});

function formSubmitHandler (evt) {
    evt.preventDefault();
};

formElement.addEventListener('submit', formSubmitHandler);

/*
const likeButton = document.querySelectorAll('.like-button');

function like() {
  likeButton.classList.add('like-button_active');
};

likeButton.addEventListener('click', function() {
  like();
});
 */
