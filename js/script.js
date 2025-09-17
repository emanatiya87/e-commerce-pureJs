let productsContainer = document.getElementById("productsContainer");
let searchForm = document.getElementById("searchForm");
let products = [];

fetch(`https://fakestoreapi.com/products`)
  .then((res) => res.json())
  .then((data) => {
    displayProducts(data);
    products = data;
  })
  .catch((error) => console.error(error));

function displayProducts(products) {
  productsContainer.innerHTML = "";
  products.forEach((p) => {
    productsContainer.innerHTML += `
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
                <div class="p-2 me-1 heart" onclick="checkFav(${p.id})">
                  <i class="fa-regular fa-heart fs-4"></i>
                </div>
                <button
                  class="btn btn-outline-dark flex-grow-1 fw-semibold rounded-0"
                  onclick="addToCart(${p.id})"
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
`;
  });
}

// search submision
searchForm.onsubmit = function (e) {
  e.preventDefault();
  let searchInput = document.getElementById("searchInput");
  let filterInput = document.getElementById("filterInput");
  if (filterInput.value == "categorty") {
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
