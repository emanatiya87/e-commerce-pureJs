// declerations
let email = document.getElementById("email");
let password = document.getElementById("password");
let loginForm = document.getElementById("loginForm");
let users = JSON.parse(localStorage.getItem("users")) || [];
import { toastShow } from "./toast.js";

// Form submission
loginForm.onsubmit = function (e) {
  e.preventDefault();
  let newUser = {
    email: email.value,
    password: password.value,
  };
  console.log(newUser);
  let exist = users.find(
    (u) => u.email == newUser.email && u.password == newUser.password
  );
  console.log(exist);
  if (exist) {
    toastShow("Logged in Successfully", "right");
    localStorage.setItem("loggedinUser", JSON.stringify(exist));
    setTimeout(() => {
      window.location = "index.html";
    }, 1500);
  } else {
    toastShow("email Or Password isn't correct!!", "wrong");
  }
};
