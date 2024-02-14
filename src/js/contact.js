document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');
    const phoneInput = document.getElementById('phone');
    const phoneCountFeedback = document.getElementById('phoneCountFeedback');

    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const phoneNumber = phoneInput.value.trim();

        if (!isValidPhoneNumber(phoneNumber)) {
            alert('Please enter a valid phone number with 10 digits.');
            return;
        }

        // Get other form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        // Print form values to console
        console.log('Name:', name);
        console.log('Phone Number:', phoneNumber);
        console.log('Email:', email);
        console.log('Subject:', subject);
        console.log('Message:', message);

        // Reset the form
        contactForm.reset();
    });

    phoneInput.addEventListener('input', function () {
        // Remove non-numeric characters
        phoneInput.value = phoneInput.value.replace(/\D/g, '');

        // Update live count feedback
        const currentCount = phoneInput.value.length;
        phoneCountFeedback.textContent = `(${currentCount}/10)`;

        // Limit input to 10 digits
        if (currentCount > 10) {
            phoneInput.value = phoneInput.value.slice(0, 10);
            phoneCountFeedback.textContent = '(10/10)';
        }
    });

    function isValidPhoneNumber(phoneNumber) {
        return /^\d{10}$/.test(phoneNumber);
    }
});
