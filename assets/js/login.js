const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const overlayContainer = document.getElementById("container");

signUpButton.addEventListener("click", () => {
  overlayContainer.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
  overlayContainer.classList.remove("right-panel-active");
});

document.getElementById("loginForm").addEventListener("submit", function(event) {
  event.preventDefault();
  var username = document.getElementById("loginUsername").value;
  var password = document.getElementById("loginPassword").value;
  var storedUser = JSON.parse(localStorage.getItem(username));

  if (storedUser && storedUser.password === password) {
    alert("Login successful. Welcome, " + username);
    window.location.href = "index.html";
  } else {
    var registerPrompt = confirm("Your record was not found. Would you like to register?");
    if (registerPrompt) {
      overlayContainer.classList.add("right-panel-active");
    }
    document.getElementById("loginForm").reset();
  }
});
document.getElementById("registerForm").addEventListener("submit", function(event) {
  event.preventDefault();
  var firstName = document.getElementById("regFirstName").value;
  var username = document.getElementById("regUsername").value;
  var password = document.getElementById("regPassword").value;

  var user = {
      password: password,
      firstName: firstName,
     
  };

  localStorage.setItem(username, JSON.stringify(user));

  alert("Your registration has been completed successfully. You can log in now.");
  window.location.href = "login.html";

  document.getElementById("registerForm").reset();
});
