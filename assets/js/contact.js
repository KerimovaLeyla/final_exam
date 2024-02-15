const contactform = document.getElementById('myContactForm');
const firstName = document.getElementById('your-name');
const lastName = document.getElementById('your-surname'); // Assuming you have an element with the id 'your-surname'
const emailaddress = document.getElementById('your-email');
const subject = document.getElementById('your-subject');
const yourmessage = document.getElementById('your-message');

contactform.addEventListener('submit', function (e) {
    e.preventDefault();

    axios.post('https://65680f6b9927836bd9740785.mockapi.io/swp102/product', {
        name: firstName.value,
        surname: lastName.value,
        emailaddress: emailaddress.value,
        subject: subject.value,
        yourmessage: yourmessage.value
    })
    .then(() => {
       
        alert('Thank you for your message. It has been sent.');
        contactform.reset();
    })
    .catch((error) => {
        
        console.error('Error sending message:', error);
        alert('Something went wrong. Please try again.');
    });
});
