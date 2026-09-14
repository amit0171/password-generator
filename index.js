let lengthEl    = document.getElementById('length-el');
let upperCaseEl = document.getElementById('uppercase-el');
let lowerCaseEl = document.getElementById('lowercase-el');
let numbersEl   = document.getElementById('numbers-el');
let symbolEl    = document.getElementById('symbol-el');
let generateEl  = document.getElementById('generate-el');
let passwordBox = document.getElementById('password-show-el');
let allCheckEl  = document.querySelectorAll('.checkel');
let showErrorEl = document.getElementById('show-error-el');
let copyEl      = document.getElementById('copy-el');
let strengthEl  = document.getElementById('strength-el');
let isError     = false;
let isLengthError = false;
let error       = [];

const lowercase = 'abcdefghijklmnopqrstuvwxyz';
const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numbers = '0123456789';
const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

generateEl.addEventListener('click', () => {
    error = [];
    strengthEl.className = '';
    let validate = CheckValidation();
    if(!isError && !isLengthError)
    {
        showErrorEl.style.display = 'none';
        let characterSet = "";
        let generatedPassword = "";

        if(upperCaseEl.checked)
        {
            characterSet += uppercase;
        }
        if(lowerCaseEl.checked)
        {
            characterSet += lowercase;
        }

        if(numbersEl.checked)
        {
            characterSet += numbers;
        }
        if(symbolEl.checked)
        {
            characterSet += symbols;
        }

        for(let i = 0; i < lengthEl.value; i++ )
        {
            let randomIndex = Math.floor(Math.random() * characterSet.length);
            generatedPassword += characterSet[randomIndex];
        }
        passwordBox.value = generatedPassword;

        let checkPassStr = checkPasswordStrength(generatedPassword);
        strengthEl.textContent   = captilizeStr(checkPassStr);
        strengthEl.classList.add(`${checkPassStr}-cl`);

        isError = false;
        isLengthError = false;
        showErrorEl.textContent = '';
        error = [];
    }
    else{
        ShowError();
    }
});

copyEl.addEventListener('click', () => {
    let generatedPassword = passwordBox.value;
    if(generatedPassword !== '' && generatedPassword !== undefined)
    {
        navigator.clipboard.writeText(generatedPassword)
        .then(() => {
            copyEl.textContent = 'Copied! ✅';

            setTimeout(() => {
                copyEl.textContent = 'Copy';
            }, 2000);
        })
        .catch(err => {
            console.error('Failed to copy text:', err);
        })
    }

});

function CheckValidation()
{
    let checkValid = Array.from(allCheckEl).filter( check => check.checked).length;
    if(lengthEl.value === ''){
            isLengthError      = true;
            error.push("Please enter a valid length for password");
    }
    else{
        if(Number(lengthEl.value) < 8)
        {
            isLengthError      = true;
            error.push("Please enter a valid length for password");
        }
        else{
            isLengthError = false;
        }
    }

    if(checkValid < 2){
        isError =  true;
        error.push('Please select atleast 2 options');
    }
    else{
        isError = false;
    }
    //  console.log(error);
}

function ShowError()
{
    showErrorEl.textContent = '';
    let errorUl = document.createElement('ul');
    for(let i = 0; i < error.length; i++)
    {
        let errorLi = document.createElement('li');
        errorLi.textContent  = error[i];
        errorLi.classList.add('error-li');

        errorUl.appendChild(errorLi);
    }
    showErrorEl.appendChild(errorUl);
    showErrorEl.style.display = 'block';
    console.log(errorUl);
}

function checkPasswordStrength(password)
{
    let score = 0;

    if(password.length > 11) score++;

    if(/[a-z]/.test(password)) score++;

    if(/[A-Z]/.test(password)) score++;

    if(/[0-9]/.test(password)) score++;

    if(/[^A-Za-z0-9]/.test(password)) score++;

    // console.log(score);
    if(score < 3)
    {
        return 'weak';
    }
    if(score < 5)
    {
        return 'medium';
    }

    return "strong";
}

function captilizeStr(str)
{
    return str[0].toUpperCase() + str.slice(1);
}

