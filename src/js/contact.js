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

        submitForm(name,phoneNumber,email,subject,message);
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
function submitForm(name, phoneNumber, email, subject, message) {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString();
    const formData = `Date and Time: ${formattedDate}\nname: ${name}\nEmail: ${email}\nPhone Number: ${phoneNumber}\nSubject: ${subject}\nMessage: ${message}`;
    console.log(formData);
    telegramMessage(formData);
}

function telegramMessage(formData) {
    const botToken = '6580613461:AAFFrCbdwwKrF8sXXoSLb3JOJLcrVecAwuY';
    const channelID = '-1002043512168';

    fetch(`https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${channelID}&text=${encodeURIComponent(formData)}`, {
        method: 'GET',
    })
        .then(response => {
            if (!response.ok) {
                console.error('Error sending message to Telegram:', response.statusText);
                alert('Error sending message. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error sending message to Telegram:', error);
            alert('Error sending message. Please try again.');
        });
}
