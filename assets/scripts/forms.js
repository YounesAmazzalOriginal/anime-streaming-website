var signupForm = document.getElementById("signup-form");
var loginForm = document.getElementById("login-form");

var userBtn = document.getElementById("user-btn");
userBtn.addEventListener("click", () => {
  loginForm.classList.remove("hidden");
});

signupForm.addEventListener("submit", (event) => {
  event.preventDefault();

  var name = document.getElementById("name-su");
  var email = document.getElementById("email-su");
  var password = document.getElementById("password-su");
  var confirmPassword = document.getElementById("confirm-password-su");

  [name, email, password, confirmPassword].forEach((input) => {
    input.classList.remove("border", "border-crimson");
  });

  if (
    name.value.trim() &&
    email.value.trim() &&
    password.value.trim() &&
    confirmPassword.value.trim()
  ) {
    console.log("Good");
  } else {
    [name, email, password, confirmPassword].forEach((input) => {
      if (!input.value.trim()) {
        input.classList.add("border", "border-crimson");
      }
    });
  }
});

// login-form
document.getElementById("login-form").addEventListener("submit", (event) => {
  event.preventDefault();
});

document.getElementById("register-link").addEventListener("click", () => {
  loginForm.classList.add("hidden");
  signupForm.classList.remove("hidden");
});
document.getElementById("login-link").addEventListener("click", () => {
  loginForm.classList.remove("hidden");
  signupForm.classList.add("hidden");
});


function closeForm(target) {
  var closeFormBtn = target.closest("form");
  closeFormBtn.classList.add("hidden");
}
