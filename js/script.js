let productsContainer = document.getElementById("productsContainer");
let searchForm = document.getElementById("searchForm");
let products = [];
let users = JSON.parse(localStorage.getItem("users"));
let loggedinUser = JSON.parse(localStorage.getItem("loggedinUser"));

fetch(`https://fakestoreapi.com/products`)
  .then((res) => res.json())
  .then((data) => {
    displayProducts(data);
    products = data;
  })
  .catch((error) => console.error(error));

function displayProducts(products) {
  productsContainer.innerHTML = "";
  let productsContent = "";
  products.forEach((p) => {
    productsContent += `
      <div class="col-lg-3 col-sm-6 col-md-4 my-2 col-9 mx-auto" key="${p.id}">
            <div class="productCard bg-white px-3 py-2">
              <div class="cardImg mb-3 text-center">
                <img
                  src="${p.image}"
                  alt="${p.title}"
                  height="300px"
                  width="90%"
                />
              </div>
              <div
                class="cardContent d-flex justify-content-between align-items-start"
              >
                <div>
                  <h6 class="m-0">${p.title}</h6>
                  <p class="text-secondary m-y-1">${p.category}</p>
                </div>
                <div>$${p.price}</div>
              </div>
              <div class="cardFooter d-flex">
               ${checkFav(p.id)}
               ${checkCart(p.id)}  
              </div>
            </div>
          </div>
`;
  });
  productsContainer.innerHTML = productsContent;
}
// search submision
searchForm.onsubmit = function (e) {
  e.preventDefault();
  let searchInput = document.getElementById("searchInput");
  let filterInput = document.getElementById("filterInput");
  if (filterInput.value == "category") {
    let filtered = products.filter((p) =>
      p.category.toLowerCase().includes(searchInput.value.toLowerCase().trim())
    );
    displayProducts(filtered);
  } else if (filterInput.value == "title") {
    let filtered = products.filter((p) =>
      p.title.toLowerCase().includes(searchInput.value.toLowerCase().trim())
    );
    displayProducts(filtered);
  }
};

// add to cart and update local storage

function addToCart(id) {
  if (localStorage.getItem("loggedinUser")) {
    let addedProduct = products.find((prod) => prod.id === id);
    let myCartProducts = users.find(
      (u) => u.id == loggedinUser.id
    ).myCartProducts;

    myCartProducts.push(addedProduct);

    let updatedUsers = users.map((u) =>
      u.id == loggedinUser.id ? { ...u, myCartProducts: myCartProducts } : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    displayProducts(products);
  } else {
    window.location = "login.html";
  }
}

// add to favourit

function addToFavourite(id) {
  if (localStorage.getItem("loggedinUser")) {
    let favProduct = products.find((prod) => prod.id === id);
    let myFavProducts = users.find((u) => u.id == loggedinUser.id).myFav;

    myFavProducts.push(favProduct);

    let updatedUsers = users.map((u) =>
      u.id == loggedinUser.id ? { ...u, myFav: myFavProducts } : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    displayProducts(products);
  } else {
    window.location = "login.html";
  }
}
function checkCart(id) {
  if (localStorage.getItem("loggedinUser")) {
    let users = JSON.parse(localStorage.getItem("users"));
    let myCartProducts = users.find(
      (u) => u.id == loggedinUser.id
    ).myCartProducts;
    let exist = myCartProducts.some((p) => p.id == id);
    if (!exist) {
      return ` <button
                  class="btn btn-outline-dark flex-grow-1 fw-semibold rounded-0"
                  onclick="addToCart(${id})"
                >
                      Add To Cart</button>`;
    } else if (exist) {
      return `    <button
                    class="btn btn-danger flex-grow-1  rounded-0"
                    onclick="removeFromCart(${id})"
                  >
                   <i class="fa-solid fa-trash"></i>Remove
                  </button>`;
    }
  } else {
    return ` <button
                  class="btn btn-outline-dark flex-grow-1 fw-semibold rounded-0"
                  onclick="addToCart(${id})"
                >
                      Add To Cart</button>`;
  }
}
function checkFav(id) {
  if (localStorage.getItem("loggedinUser")) {
    let users = JSON.parse(localStorage.getItem("users"));

    let myFavProducts = users.find((u) => u.id == loggedinUser.id).myFav;
    let exist = myFavProducts.some((p) => p.id == id);
    if (!exist) {
      return ` 
                <div class="p-2 me-1 heart" onclick="addToFavourite(${id})">
                  <i class="fa-regular fa-heart fs-4"></i>
                </div>`;
    } else if (exist) {
      return `   <div class="p-2 me-1 heart heartClicked" onclick="removeFromFav(${id})">
                  <i class="fa-regular  fa-heart fs-4"></i>
                </div>
     `;
    }
  } else {
    return ` 
                <div class="p-2 me-1 heart" onclick="addToFavourite(${id})">
                  <i class="fa-regular fa-heart fs-4"></i>
                </div>`;
  }
}
// remove From Cart
function removeFromCart(id) {
  let users = JSON.parse(localStorage.getItem("users"));

  myCartProducts = users.find((u) => u.id == loggedinUser.id).myCartProducts;

  let restProducts = myCartProducts.filter((prod) => prod.id !== id);
  let updatedUsers = users.map((u) =>
    u.id == loggedinUser.id ? { ...u, myCartProducts: restProducts } : u
  );
  localStorage.setItem("users", JSON.stringify(updatedUsers));
  displayProducts(products);
}
// remove from fav
function removeFromFav(id) {
  let users = JSON.parse(localStorage.getItem("users"));

  let myFavProducts = users.find((u) => u.id == loggedinUser.id).myFav;

  let restProducts = myFavProducts.filter((prod) => prod.id !== id);
  let updatedUsers = users.map((u) =>
    u.id == loggedinUser.id ? { ...u, myFav: restProducts } : u
  );
  localStorage.setItem("users", JSON.stringify(updatedUsers));
  displayProducts(products);
}
