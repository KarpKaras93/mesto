const showInputError = (formElement, inputElement, errorMessage, params) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(params.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(params.errorClass);
};

const hideInputError = (formElement, inputElement, params) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(params.inputErrorClass);
  errorElement.classList.remove(params.errorClass);
  errorElement.textContent = '';
};

const activeButton = (buttonElement, params) => {
  buttonElement.disabled = false;
  buttonElement.classList.remove(params.inactiveButtonClass);
};

const inactiveButton = (buttonElement, params) => {
  buttonElement.disabled = true;
  buttonElement.classList.add(params.inactiveButtonClass);
};

const toggleSubmitButtonState = (inputElement, buttonElement, params) => {
  if (!inputElement.validity.valid) {
    inactiveButton(buttonElement, params);
  } else {
    activeButton(buttonElement, params);
  }
};

const checkInputValidity = (formElement, inputElement, params) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, params);
  } else {
    hideInputError(formElement, inputElement, params);
  }
};

const setEventListeners = (formElement, params) => {
  const inputList = Array.from(formElement.querySelectorAll(params.inputSelector));
  const buttonElement = formElement.querySelector(params.submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, params);
      toggleSubmitButtonState(inputElement, buttonElement, params);
    });
  });
};

function enableValidation(params) {
 const formList = Array.from(document.querySelectorAll(params.formSelector));
 formList.forEach((formElement) => {
   formElement.addEventListener('submit', function(evt) {
     evt.preventDefault();
   });
   setEventListeners(formElement, params);
 });
};
