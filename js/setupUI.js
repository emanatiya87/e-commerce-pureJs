let currentUser = localStorage.getItem("loggedinUser");
let navUserData = document.getElementById("navUserData");
let navbarSupportedContent = document.getElementById("navbarSupportedContent");
let logoutBTN = document.getElementById("logoutBTN");
let UserName = document.getElementById("UserName");

if (currentUser) {
  navUserData.style.display = "flex";
  navbarSupportedContent.style.display = "none";
  UserName.innerHTML = JSON.parse(currentUser).firstName.toUpperCase();
} else {
  navUserData.style.display = "none";
  navbarSupportedContent.style.display = "block";
}
logoutBTN.onclick = function () {
  localStorage.removeItem("loggedinUser");
  window.location.reload();
};
