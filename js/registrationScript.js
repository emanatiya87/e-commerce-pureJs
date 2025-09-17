// declerations
let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let email = document.getElementById("email");
let password = document.getElementById("password");
let registrationForm = document.getElementById("registrationForm");
import { toastShow } from "./toast.js";

// form Submission
registrationForm.onsubmit = function (e) {
  e.preventDefault();
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let newUser = {
    id: Date.now(),
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    password: password.value,
  };
  localStorage.setItem("users", JSON.stringify([...users, newUser]));
  toastShow("Your account created successfully", "right");
  setTimeout(() => {
    window.location = "login.html";
  }, 1500);
};
