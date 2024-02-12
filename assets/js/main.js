$('button').click(function() {
    $(this).toggleClass('clicked');
    $('button p').text(function(i, text) {
      return text === "Sent!" ? "Send" : "Sent!";
    });
  });

  document.addEventListener("DOMContentLoaded", function () {
    const darkModeToggle = document.getElementById("darkModeToggle");

    darkModeToggle.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
    });
});

