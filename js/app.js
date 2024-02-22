const lengthSlider = document.querySelector('.password-length input');
const generateBtn = document.querySelector('.generate-btn');
const passworInput = document.querySelector('.input-box input');
const options = document.querySelectorAll('.options input');
const passIndicador = document.querySelector('.password-indicator');
const copyIcon = document.querySelector('#copy');

const characters = {
    lowercase: ' abcdefghijklmnñopqrstuvwxyz',
    uppercase: 'ABCDEFGHIJKÑMMÑOPQRSTUVWXYZ',
    numbers: '0123456789',
    symbols: '^!$%&|[](){}:;.,*+-#@<>°'

}

const geratePassword = () => {
    let stacticPassword = '';
    let passLengt = lengthSlider.value;
    let exDuplicate = false;
    let ramdomPassword = '';
    options.forEach(option => {
        if (option.checked) {
            if (option.id !== 'exc-duplicate' && option.id !== 'spaces') {

                stacticPassword += characters[option.id]

            } else if (option.id !== 'spaces') {
                stacticPassword += ` ${stacticPassword} `;
            } else {
                exDuplicate = true;
            }

        }
    })
    for (let i = 0; i < passLengt; i++) {
        let ramdonChart = stacticPassword[Math.floor(Math.random() * stacticPassword.length)]
        if (exDuplicate) {
            !ramdomPassword.includes(ramdonChart) || ramdonChart == ' ' ? ramdomPassword += ramdonChart : i--;
        } else {
            ramdomPassword += ramdonChart
        }
    }
    passworInput.value = ramdomPassword;
}

const updatePasswordIndicador = () => {

    passIndicador.id = lengthSlider.value <= 8 ? 'weak' : lengthSlider.value <= 16 ? 'medium' : 'strong';
}

const updateSlider = () => {
    document.querySelector('.password-length span').innerText = lengthSlider.value
    geratePassword();
    updatePasswordIndicador();

}
const copypassword = () => {
    navigator.clipboard.writeText(passworInput.value);
    copyIcon.innerHTML = '<i class="ri-checkbox-multiple-line"></i>';
    setTimeout(() => {
        copyIcon.innerHTML = '<i class="ri-file-copy-line"></i>';
    }, 1500)
}


updateSlider();


copyIcon.addEventListener('click', copypassword);
lengthSlider.addEventListener('input', updateSlider);
generateBtn.addEventListener('click', geratePassword);