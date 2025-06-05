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

    // Password Visibility
    function togglePassword() {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            togglePswd.classList.remove('bi-eye-slash');
            togglePswd.classList.add('bi-eye');
        } else {
            passwordInput.type = 'password';
            togglePswd.classList.remove('bi-eye');
            togglePswd.classList.add('bi-eye-slash');
        }
    }
    togglePswd.addEventListener('click', togglePassword);

    // Confirm Password Visibility
    function toggleconfirmPassword() {
        if (confirmPasswordInput.type === 'password') {
            confirmPasswordInput.type = 'text';
            toggleconfirmPswd.classList.remove('bi-eye-slash');
            toggleconfirmPswd.classList.add('bi-eye');
        } else {
            confirmPasswordInput.type = 'password';
            toggleconfirmPswd.classList.remove('bi-eye');
            toggleconfirmPswd.classList.add('bi-eye-slash');
        }
    }
    toggleconfirmPswd.addEventListener('click', toggleconfirmPassword);

    // Validation functions
    function validateFullName(fullName) {
        const fullNameCondt = /^[A-Za-z\s]+$/;
        return fullNameCondt.test(fullName.trim());
    }

    function validateEmailId(email) {
        const emailAddressCondt = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailAddressCondt.test(email.trim());
    }

    function validatePassword(password) {
        const passwordCondt = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;
        return passwordCondt.test(password.trim());
    }

    // Real-time validation (blur)
    fullNameInput.addEventListener('blur', function () {
        if (!validateFullName(this.value)) {
            errors[0].style.display = 'block';
        } else {
            errors[0].style.display = 'none';
        }
    });

    emailInput.addEventListener('blur', function () {
        if (!validateEmailId(this.value)) {
            errors[1].style.display = 'block';
        } else {
            errors[1].style.display = 'none';
        }
    });

    passwordInput.addEventListener('blur', function () {
        if (!validatePassword(this.value)) {
            errors[2].style.display = 'block';
        } else {
            errors[2].style.display = 'none';
        }
    });

    confirmPasswordInput.addEventListener('blur', function () {
        if (this.value !== passwordInput.value || this.value === '') {
            errors[3].style.display = 'block';
        } else {
            errors[3].style.display = 'none';
        }
    });

    termsandcondt.addEventListener('change', function () {
        if (!this.checked) {
            errors[4].style.display = 'block';
        } else {
            errors[4].style.display = 'none';
        }
    });

    // Hide error on user input/change
    fullNameInput.addEventListener('input', () => {
        errors[0].style.display = 'none';
    });

    emailInput.addEventListener('input', () => {
        errors[1].style.display = 'none';
    });

    passwordInput.addEventListener('input', () => {
        errors[2].style.display = 'none';
    });

    confirmPasswordInput.addEventListener('input', () => {
        errors[3].style.display = 'none';
    });

    termsandcondt.addEventListener('change', () => {
        errors[4].style.display = 'none';
    });

    // Form Submit
    form.addEventListener('submit', e => {
        e.preventDefault();

        // Hide all errors
        errors.forEach(error => error.style.display = 'none');

        let isValid = true;

        const fullName = fullNameInput.value;
        const email = emailInput.value;
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

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

        if (isValid) {
            successResult.innerHTML = 'Form Submitted Successfully 👍';
            successResult.classList.add('alert-success','alert');
            form.reset();
        }
    });
});
