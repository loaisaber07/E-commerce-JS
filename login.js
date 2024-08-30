userListGroup= [] ; 
document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    if (validateForm()) {
        const userName = document.getElementById('userName').value;
        const pass  = document.getElementById('form3Example4').value ; 
        const user = {
            userName : userName , 
            password : pass
        }  
        userListGroup.push(user); 
        localStorage.setItem('userName',JSON.stringify(userListGroup)); // Store username in localStorage
        console.log('User Name:', userName);
        alert('Form submitted successfully!'); 
        location.assign("loginpage.html")
        // You can now submit the form data via AJAX or any other method
    }
});

function validateForm() {
    const emailField = document.getElementById('form3Example3');
    const userNameField = document.getElementById('userName');
    const passwordField = document.getElementById('form3Example4');
    const confirmPasswordField = document.getElementById('form3Example5');

    const emailError = document.getElementById('emailError');
    const userNameError = document.getElementById('userNameError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let isValid = true;

    // Validate email
    if (emailField.value.trim() === '' || !emailRegex.test(emailField.value)) {
        emailError.style.display = 'inline';
        emailField.classList.add('invalid');
        isValid = false;
    } else {
        emailError.style.display = 'none';
        emailField.classList.remove('invalid');
    }

    // Validate user name
    if (userNameField.value.trim() === '') {
        userNameError.style.display = 'inline';
        userNameField.classList.add('invalid');
        isValid = false;
    } else {
        userNameError.style.display = 'none';
        userNameField.classList.remove('invalid');
    }

    // Validate password
    if (passwordField.value.length < 8) {
        passwordError.style.display = 'inline';
        passwordField.classList.add('invalid');
        isValid = false;
    } else {
        passwordError.style.display = 'none';
        passwordField.classList.remove('invalid');
    }

    // Validate confirm password
    if (passwordField.value !== confirmPasswordField.value) {
        confirmPasswordError.style.display = 'inline';
        confirmPasswordField.classList.add('invalid');
        isValid = false;
    } else {
        confirmPasswordError.style.display = 'none';
        confirmPasswordField.classList.remove('invalid');
    }

    return isValid;
}