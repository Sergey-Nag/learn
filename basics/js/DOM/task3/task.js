/*
            Написать реализацию валидации формы.
            1. Изначально все поля не валидны и сообщения об ошибках скрыты. 
                1.1. Кнопка отправки формы неактивна. (Дополнительно №2)
                1.2. Как только пользователь заполнил все поля, кнопка отправки формы становится активной. (Дополнительно №2)
            2. При отправке формы запускается валидация.
            3. Если хоть одно поле не валидно, поле должно быть подсвечено красным цветом и показано сообщение об ошибке.
            4. Если все поля валидны, при отправке формы вывести сообщение об успешной регистрации.

            Требования к полям формы:
                Имя:
                    - только буквы, без пробелов и спецсимволов
                    - длинна от 1 до 20 символов
                Email:
                    - корректный email (как миниму должна быть @ и .)
                        * Дополгнительно: можно использовать регулярное выражение.
                Пароль:
                    - длинна от 6 до 20 символов
                    - хотя бы одна заглавная буква
                    - хотя бы одна строчная буква
                    - хотя бы одна цифра
                Подтверждение пароля:
                    - должно совпадать с паролем

            Дополнительно №1:
                - При нажатии на кнопку с иконкой глаза, пароль должен становиться видимым и наоборот
                  При этом иконка должна меняться с eye-show на eye-hide и наоборот

            Дополнительно №2:
                - Когда пользователь вводит данные в первый раз, то сообщения об ошибках не должны показываться
                - После первой попытки отправить форму, сообщения об ошибках должны показаться
                - Дальше, валидация должна происходить при каждом изменении данных в полях
                - Если пользователь исправил ошибку, сообщение об ошибке должно скрыться а поле стать валидным и наоборот
                - Кнопка отправки формы должна становиться активной только если все поля валидны

        */
let nameInput = document.querySelector('#name');
let emailInput = document.querySelector('#email');
let passwordInput = document.querySelector('#password');
let confirmPasswordInput = document.querySelector('#confirmPassword');

let nameMessages = {
    letters: document.querySelector('#message-name-letters'),
    length: document.querySelector('#message-name-length'),
}
let emailMessages = {
    invalid: document.querySelector('#message-email'),
}

let passMessages = {
    length: document.querySelector('#message-password-length'),
    upperCase: document.querySelector('#message-password-uppercase'),
    lowerCase: document.querySelector('#message-password-lowercase'),
    number: document.querySelector('#message-password-number'),
}

let confirmPassMessages = {
    invalid: document.querySelector('#message-confirm-password'),
}
const LATIN_CHARACTERS = 'qwertyuiopasdfghjklzxcvbnm'
// const reg = /[A-z]/;
const INVALID_INPUT_CLASS = 'invalid';
const MESSAGE_VISIBLE_CLASS = 'visible';
const VALID_INPUT_CLASS = 'valid';
const EMAIL_AT_SYMBOL = '@'
const NUMBER_CHARACTERS = '1234567890'
/**
 * Функция валидации формы
 * Возвращает true, если форма валидна, иначе false
 *
 * @returns {boolean}
 */

const errors = {
    name: {
        letters: false,
        length: false,
    },
    email: {
        invalid: false,
    },
    password:{
        length: false,
        upperCase: false,
        lowerCase: false,
        number: false,
    },
    confirmPassword: {
        invalid: false,
    }
}

function validateForm() {
    let result = true;
    let emailValue = emailInput.value;
    let nameValue = nameInput.value;
    let passValue = passwordInput.value
    let confirmPassValue = confirmPasswordInput.value
    // region name validation
    if (nameValue.length < 1 || nameValue.length > 20){
        result = false;
        errors.name.length = true;
    } else {
        errors.name.length = false;
    }
    let containsLatinsCharacters = true;
    for (let i = 0; i < nameValue.length; i++){
        if(!LATIN_CHARACTERS.includes(nameValue[i]) &&!LATIN_CHARACTERS.toUpperCase().includes(nameValue[i])){
            containsLatinsCharacters = false;
        }
    }
    if (!containsLatinsCharacters) {
        result = false;
        errors.name.letters = true;
    } else {
        errors.name.letters = false;
    }
//region email validation
    if (!emailValue.includes(EMAIL_AT_SYMBOL) || !emailValue.includes('.', emailValue.indexOf(EMAIL_AT_SYMBOL))) {
        result = false;
        errors.email.invalid = true;
    } else {
        errors.email.invalid = false;
    }

    if (passValue.length < 6 || passValue.length > 20) {
        result = false;
        errors.password.length = true;
    } else {
        errors.password.length = false;
    }
    let containsUpperCaseCharacters = false;
    let containsLowerCaseCharacters = false;
    let containsNumberCharacter = false
    for (let i = 0; i < passValue.length; i++){
        if(LATIN_CHARACTERS.toUpperCase().includes(passValue[i]) && containsUpperCaseCharacters === false){
            containsUpperCaseCharacters  = true; 
        }
        if (LATIN_CHARACTERS.includes(passValue[i]) && containsLowerCaseCharacters === false){
            containsLowerCaseCharacters = true;
        }
        if (NUMBER_CHARACTERS.includes(passValue[i])){
            containsNumberCharacter = true;
        }
    }
    
    if (!containsUpperCaseCharacters) {
        result = false;
        errors.password.upperCase = true;
    } else {
        errors.password.upperCase = false;
    }
    if (!containsLowerCaseCharacters) {
        result = false;
        errors.password.lowerCase = true;
    } else {
        errors.password.lowerCase = false;
    }
    if (!containsNumberCharacter) {
        result = false;
        errors.password.number = true;
    } else {
        errors.password.number = false;
    }
    if (passValue !== confirmPassValue) {
        result = false;
        errors.confirmPassword.invalid = true;
    } else {
        errors.confirmPassword.invalid = false;
    }
    return result;
} 


/**
 * Функция показывает сообщения об ошибках
 */
function showValidationMessages (){
    if (errors.name.length) {
        nameMessages.length.classList.add(MESSAGE_VISIBLE_CLASS);
        nameInput.classList.add(INVALID_INPUT_CLASS);
    };
    if (errors.name.letters) {
        nameInput.classList.add(INVALID_INPUT_CLASS);
        nameMessages.letters.classList.add(MESSAGE_VISIBLE_CLASS);
    };
    if(errors.email.invalid){
        emailMessages.invalid.classList.add(MESSAGE_VISIBLE_CLASS);
        emailInput.classList.add(INVALID_INPUT_CLASS);
    }
    if(errors.password.length){
        passMessages.length.classList.add(MESSAGE_VISIBLE_CLASS);
        passwordInput.classList.add(INVALID_INPUT_CLASS);
    };
    if(errors.password.upperCase){
        passwordInput.classList.add(INVALID_INPUT_CLASS);
        passMessages.upperCase.classList.add(MESSAGE_VISIBLE_CLASS);
    }
    if(errors.password.lowerCase){
        passwordInput.classList.add(INVALID_INPUT_CLASS);
        passMessages.lowerCase.classList.add(MESSAGE_VISIBLE_CLASS);
    };
    if(errors.password.number){
        passwordInput.classList.add(INVALID_INPUT_CLASS);
        passMessages.number.classList.add(MESSAGE_VISIBLE_CLASS);
    };
    if(errors.confirmPassword.invalid){
        confirmPasswordInput.classList.add(INVALID_INPUT_CLASS);
        confirmPassMessages.invalid.classList.add(MESSAGE_VISIBLE_CLASS);
    };
}

/**
 * Функция скрывает сообщения об ошибках
 */
function hideValidationMessages(){
    nameInput.classList.remove(INVALID_INPUT_CLASS);
    nameMessages.length.classList.remove(MESSAGE_VISIBLE_CLASS);
    nameMessages.letters.classList.remove(MESSAGE_VISIBLE_CLASS);

    emailInput.classList.remove(INVALID_INPUT_CLASS);
    emailMessages.invalid.classList.remove(MESSAGE_VISIBLE_CLASS);
    
    passwordInput.classList.remove(INVALID_INPUT_CLASS);
    passMessages.length.classList.remove(MESSAGE_VISIBLE_CLASS);
    passMessages.upperCase.classList.remove(MESSAGE_VISIBLE_CLASS);
    passMessages.lowerCase.classList.remove(MESSAGE_VISIBLE_CLASS);
    passMessages.number.classList.remove(MESSAGE_VISIBLE_CLASS);

    confirmPasswordInput.classList.remove(INVALID_INPUT_CLASS);
    confirmPassMessages.invalid.classList.remove(MESSAGE_VISIBLE_CLASS);
}


const form = document.getElementById('register-form');
form.addEventListener('submit', function (event) {
    event.preventDefault();

    console.log('before', structuredClone(errors))
    hideValidationMessages();

    const isFormValid = validateForm();
    console.log('after', structuredClone(errors))

    if (isFormValid) {
        // setTimeout(() => {
        alert('Success');
        // }, 0)
    } else {
        showValidationMessages();
    }
});

form.addEventListener('change', function (event) {
    // event содержит информацию о событии
    // event.target содержит элемент, на котором произошло событие
    // event.target.name содержит имя элемента (атрибут name)
    // event.target.value содержит значение элемента
    console.log(event.target.name, event.target.value);
});
