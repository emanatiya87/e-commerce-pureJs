let productsContainer = document.getElementById("productsContainer");
let users = JSON.parse(localStorage.getItem("users"));
let loggedinUser = JSON.parse(localStorage.getItem("loggedinUser"));
let favProductsContainer = document.getElementById("favProductsContainer");
let myCartProducts = users.find((u) => u.id == loggedinUser.id).myCartProducts;
let myFavProducts = users.find((u) => u.id == loggedinUser.id).myFav;
let totalPriceEl = document.getElementById("totalPrice");

displayProducts(myCartProducts);

function displayProducts(products) {
  productsContainer.innerHTML = "";
  let productsContent = "";
  products.forEach((p) => {
    productsContent += `
    <tr>
                <td>
                  <img
                    src="${p.image}"
                    height="50px"
                    alt="${p.title}"
                  />
                </td>
                <td>${p.title}</td>
                <td>${p.category}</td>
                <td><div class="input-group ">
                    <button class="input-group-text" onclick="decreaseInput(${[
                      p.id,
                    ]})">-</button>
                    <input type="text" class="form-control  text-center quantityInput" value="1"
                    id="${p.id}" />
                    <button class="input-group-text" onclick="increaseInput(${
                      p.id
                    })">+</button>
                  </div>
                </td>
                <td>$${p.price}</td>
                <td>
                  <button
                    class="btn btn-outline-danger flex-grow-1  rounded-0"
                    onclick="removeFromCart(${p.id})"
                  >
                   <i class="fa-solid fa-trash"></i>Remove
                  </button>
                </td>
              </tr>
`;
  });
  productsContainer.innerHTML = productsContent;
}
// remove From Cart
function removeFromCart(id) {
  let users = JSON.parse(localStorage.getItem("users"));
  let loggedinUser = JSON.parse(localStorage.getItem("loggedinUser"));

  myCartProducts = users.find((u) => u.id == loggedinUser.id).myCartProducts;

  let restProducts = myCartProducts.filter((prod) => prod.id !== id);
  let updatedUsers = users.map((u) =>
    u.id == loggedinUser.id ? { ...u, myCartProducts: restProducts } : u
  );
  localStorage.setItem("users", JSON.stringify(updatedUsers));
  displayProducts(restProducts);
}
// fav

displayFavProducts(myFavProducts);

function displayFavProducts(products) {
  favProductsContainer.innerHTML = "";
  let productsContent = "";
  products.forEach((p) => {
    productsContent += `
    <tr>
                <td>
                  <img
                    src="${p.image}"
                    height="50px"
                    alt="${p.title}"
                  />
                </td>
                <td>${p.title}</td>
                <td>${p.category}</td>
                <td>$${p.price}</td>
                <td>
                  <button
                    class="btn btn-outline-danger flex-grow-1  rounded-0"
                    onclick="removeFromFav(${p.id})"
                  >
                   <i class="fa-solid fa-trash"></i>Remove
                  </button>
                </td>
              </tr>
`;
  });
  favProductsContainer.innerHTML = productsContent;
}
// remove from fav
function removeFromFav(id) {
  let users = JSON.parse(localStorage.getItem("users"));
  let loggedinUser = JSON.parse(localStorage.getItem("loggedinUser"));

  let myFavProducts = users.find((u) => u.id == loggedinUser.id).myFav;

  let restProducts = myFavProducts.filter((prod) => prod.id !== id);
  let updatedUsers = users.map((u) =>
    u.id == loggedinUser.id ? { ...u, myFav: restProducts } : u
  );
  localStorage.setItem("users", JSON.stringify(updatedUsers));
  displayFavProducts(restProducts);
}
// total price
function showTotalPrice() {
  let users = JSON.parse(localStorage.getItem("users"));
  let loggedinUser = JSON.parse(localStorage.getItem("loggedinUser"));
  let myCartProducts = users.find(
    (u) => u.id == loggedinUser.id
  ).myCartProducts;
  let totalPrice = 0;
  myCartProducts.forEach((p) => {
    let quantityInput = document.querySelector(
      `.quantityInput[id="${p.id}"]`
    ).value;
    totalPrice += p.price * quantityInput;
  });
  totalPriceEl.style.display = "block";
  totalPriceEl.innerHTML = totalPrice.toFixed(2);
}
// quantity
function decreaseInput(id) {
  let quantityInput = document.querySelector(`.quantityInput[id="${id}"]`);
  if (quantityInput.value <= 1) {
    removeFromCart(id);
  } else {
    quantityInput.value--;
  }
}
function increaseInput(id) {
  let quantityInput = document.querySelector(`.quantityInput[id="${id}"]`);
  quantityInput.value++;
}
