document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const errors = document.querySelectorAll('.invalid-error');
    const togglePswd = document.getElementById('togglePassword');
    const toggleconfirmPswd = document.getElementById('toggleconfirmPassword');
    const passwordInput = document.getElementById('password');
    const fullNameInput = document.getElementById('fullname');
    const emailInput = document.getElementById('email');
    const confirmPasswordInput = document.getElementById('confirmpassword');
    const termsandcondt = document.getElementById('termsandcondt');
    const successResult = document.getElementById('successResult');
    const signUpBtn = document.getElementById('signupBtn');

    //Password Show/Hide
    togglePswd.addEventListener('click', togglePassword => {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            togglePswd.classList.remove('bi-eye-slash');
            togglePswd.classList.add('bi-eye');
        }
        else {
            passwordInput.type = 'password';
            togglePswd.classList.remove('bi-eye');
            togglePswd.classList.add('bi-eye-slash');
        }
    });
    //Confirm Password Show/Hide
    toggleconfirmPswd.addEventListener('click', toggleconfirmPassword => {
        if (confirmPasswordInput.type === 'password') {
            confirmPasswordInput.type = 'text';
            toggleconfirmPswd.classList.remove('bi-eye-slash');
            toggleconfirmPswd.classList.add('bi-eye');
        }
        else {
            confirmPasswordInput.type = 'password';
            toggleconfirmPswd.classList.remove('bi-eye');
            toggleconfirmPswd.classList.add('bi-eye-slash');
        }
    });
    //Regex method for Validation
    function validfullName(fullName) {
        let fullNameCondt = /^[A-Za-z\s]+$/;
        return fullNameCondt.test(fullName.trim());
    }

    fullNameInput.addEventListener('blur', function () {
        if (!validfullName(this.value)) {
            errors[0].style.display = 'block';
        }
        else{
            errors[0].style.display = 'none';
        }
    });
        // Hide error on user input/change
    fullNameInput.addEventListener('input', () => {
        errors[0].style.display = 'none';
    });
    //Email validation
    function validemailInput(emailInput) {
        let emailCondt = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailCondt.test(emailInput.trim());
    }

    emailInput.addEventListener('blur', function () {
        if (!validemailInput(this.value)) {
            errors[1].style.display = 'block';
        }
        else{
            errors[1].style.display = 'none';
        }
    });
    emailInput.addEventListener('input', () => {
        errors[1].style.display = 'none';
    });     
    //Password
    function validpasswordInput(passwordInput) {
        let passwordCondt = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;
        return passwordCondt.test(passwordInput.trim());
    }

    passwordInput.addEventListener('blur', function () {
        if (!validpasswordInput(this.value)) {
            errors[2].style.display = 'block';
        }
        else{
            errors[2].style.display = 'none';
        }
    });
    passwordInput.addEventListener('input', () => {
        errors[2].style.display = 'none';
    });     
    //confirm Password
    confirmPasswordInput.addEventListener('blur',function(){
        if(this.value !== passwordInput.value || this.value === ''){
             errors[3].style.display = 'block';
        }
        else{
            errors[3].style.display = 'none';
        }
    });
    
    confirmPasswordInput.addEventListener('input', () => {
        errors[3].style.display = 'none';
    });     
    //checkbox 
        termsandcondt.addEventListener('change',function(){
        if(!this.checked){
             errors[4].style.display = 'block';
        }
        else{
            errors[4].style.display = 'none';
        }
    });
    
    termsandcondt.addEventListener('input', () => {
        errors[4].style.display = 'none';
    });     
    function checkFormValidity(){
        const isFullNameValid = validateFullName(fullNameInput.value);
        const isEmailValid = validateEmailId(emailInput.value);
        const isPasswordValid = validatePassword(passwordInput.value);
        const isConfirmPasswordValid = passwordInput.value === confirmPasswordInput.value && confirmPasswordInput.value !== '';
        const isTermsAccepted = termsandcondt.checked;        
        const isFormValid = isFullNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid && isTermsAccepted;
        signUpBtn.disabled = !isFormValid;
        signUpBtn.style.cursor = isFormValid ? "pointer" : "not-allowed";

    }

    [fullNameInput, emailInput, passwordInput, confirmPasswordInput].forEach(input => {
        input.addEventListener('input', checkFormValidity);
    });
    termsandcondt.addEventListener('change', checkFormValidity);

    // Initial check on page load
    checkFormValidity();

    //Form Submit
    form.addEventListener('submit',e => {
        e.preventDefault();
        errors.forEach(error => error.style.display = 'none');
         let isValid = true;

        const fullName = fullNameInput.value;
        const email = emailInput.value;
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        const termsandcondt = termsandcondt.checked;
        // Full name validation
        if (!validateFullName(fullName)) {
            errors[0].style.display = 'block';
            isValid = false;
        }
        // Email validation
        if (!validateEmailId(email)) {
            errors[1].style.display = 'block';
            isValid = false;
        }
        // Password validation
        if (!validatePassword(password)) {
            errors[2].style.display = 'block';
            isValid = false;
        }
        // Confirm password validation
        if (password !== confirmPassword || confirmPassword === '') {
            errors[3].style.display = 'block';
            isValid = false;
        }
        // Checkbox validation
        if (!termsandcondt.checked) {
            errors[4].style.display = 'block';
            isValid = false;
        }

        if (!isValid) {
            signUpBtn.disabled = true;
            signUpBtn.style.cursor = "not-allowed";
        } else {
            // Success
            signUpBtn.removeAttribute('disabled');
            signUpBtn.style.cursor = "pointer";
            successResult.innerHTML = 'Form Submitted Successfully 👍';
            successResult.classList.add('alert-success', 'alert');
            successResult.style.display = 'block';

            form.reset();

            // Hide all errors after reset
            errors.forEach(error => error.style.display = 'none');
            // Disable button and reset cursor after reset
            signUpBtn.disabled = true;
            signUpBtn.style.cursor = "not-allowed";

            // Hide success message after 3 seconds
            setTimeout(() => {
                successResult.style.display = 'none';
                successResult.innerHTML = '';
                successResult.classList.remove('alert-success', 'alert');
            }, 5000);
        }
    });
});
