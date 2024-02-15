// Function to check if the phone number is valid (10 digits)
function isValidPhoneNumber(phoneNumber) {
    const regex = /^\d{10}$/;
    return regex.test(phoneNumber);
}

// Function to check if the email is a valid Gmail address
function isValidGmail(email) {
    const regex = /^[a-zA-Z0-9_.+-]+@gmail\.com$/;
    return regex.test(email);
}

// Get form elements
const rezervform = document.getElementById('book-table-form');
const name = document.getElementById('name');
const emailaddress = document.getElementById('email');
const phone = document.getElementById('phone');
const date = document.getElementById('date');
const time = document.getElementById('time');
const size = document.getElementById('party-size');
const message = document.getElementById('message');

// Add event listener to the form
rezervform.addEventListener('submit', function (e) {
    e.preventDefault();

    // Validate phone number and Gmail
    if (!isValidPhoneNumber(phone.value)) {
        alert('Please enter a valid phone number (10 digits).');
        return;
    }

    if (!isValidGmail(emailaddress.value)) {
        alert('Please enter a valid Gmail address.');
        return;
    }

    // Send data to the server using Axios
    axios.post('https://65680f6b9927836bd9740785.mockapi.io/swp102/product', {
        name: name.value,
        emailaddress: emailaddress.value,
        phone: phone.value,
        date: date.value,
        time: time.value,
        size: size.value,
        message: message.value
    })
    .then(() => {
      
        alert('Thank you for your reservation. It has been submitted successfully.');
        rezervform.reset();
    })
    .catch((error) => {

        console.error('Error adding reservation:', error);
        alert('Something went wrong. Please try again.');
    });
});
