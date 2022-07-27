export class FormValidator {
  constructor(params, formElement) {
    this._params = params;
    this._formElement = formElement;
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

activeButton(buttonElement) {
  buttonElement.removeAttribute('disabled');
  buttonElement.classList.remove(this._params.inactiveButtonClass);
};

inactiveButton(buttonElement) {
  buttonElement.setAttribute('disabled', true);
  buttonElement.classList.add(this._params.inactiveButtonClass);
};

_toggleSubmitButtonState(inputElement, buttonElement) {
  if (!inputElement.validity.valid) {
    this.inactiveButton(buttonElement);
  } else {
    this.activeButton(buttonElement);
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
  const inputList = Array.from(this._formElement.querySelectorAll(this._params.inputSelector));
  const buttonElement = this._formElement.querySelector(this._params.submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      this._checkInputValidity(inputElement);
      this._toggleSubmitButtonState(inputElement, buttonElement);
    });
  });
};

enableValidation() {
 const formList = Array.from(document.querySelectorAll(this._params.formSelector));
 formList.forEach(() => {
   this._formElement.addEventListener('submit', (evt) => {
     evt.preventDefault();
   });
  this._setEventListeners();
 });
};
}
