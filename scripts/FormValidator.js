export class FormValidator {
  constructor(params, formElement) {
    this._params = params;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._params.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._params.submitButtonSelector);
  }

_showInputError(inputElement, errorMessage) {
  const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(this._params.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(this._params.errorClass);
};

_hideInputError(inputElement) {
  const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(this._params.inputErrorClass);
  errorElement.classList.remove(this._params.errorClass);
  errorElement.textContent = '';
};

_activeButton() {
  this._buttonElement.removeAttribute('disabled');
  this._buttonElement.classList.remove(this._params.inactiveButtonClass);
};

_inactiveButton() {
  this._buttonElement.setAttribute('disabled', true);
  this._buttonElement.classList.add(this._params.inactiveButtonClass);
};

_toggleSubmitButtonState(inputElement) {
  if (!inputElement.validity.valid) {
    this._inactiveButton();
  } else {
    this._activeButton();
  }
};

_checkInputValidity(inputElement) {
  if (!inputElement.validity.valid) {
    this._showInputError(inputElement, inputElement.validationMessage);
  } else {
    this._hideInputError(inputElement);
  }
};

_setEventListeners = () => {
  this._inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      this._checkInputValidity(inputElement);
      this._toggleSubmitButtonState(inputElement);
    });
  });
};

enableValidation() {
   this._formElement.addEventListener('submit', (evt) => {
     evt.preventDefault();
   });
  this._setEventListeners();
};

resetValidation() {
  this._inputList.forEach((inputElement) => {
    this._toggleSubmitButtonState(inputElement);
    this._hideInputError(inputElement);
  });
};

}
