let arrMeals = [];

async function getMeals() {
  try {
    const response = await fetch("./quotes.json");
    const meals = await response.json();
    arrMeals = meals;
    showMeals();
  } catch (error) {
    console.log("Xatolik chiqdi:", error);
  }
}

getMeals();

const cardContainer = document.querySelector(".cards-grid");

function showMeals() {
  cardContainer.innerHTML = "";

  for (let i = 0; i < arrMeals.length; i++) {
    cardContainer.innerHTML += `
      <div class="card">
        <div>
          <img src="${arrMeals[i].image}" width="150">
        </div>
        <h3>${arrMeals[i].name}</h3>
        <p>${arrMeals[i].category}</p>
        <p>${arrMeals[i].price} $</p>
        <button onclick="addToCart(${i})">Add to Cart</button>
      </div>
    `;
  }
}

let basket = JSON.parse(localStorage.getItem("basket")) || [];

const cartCount = document.querySelector(".cart-count");

function showTotalMeal() {
  cartCount.textContent = basket.length;
}

showTotalMeal();

function addToCart(index) {
  basket.push(arrMeals[index]);
  localStorage.setItem("basket", JSON.stringify(basket));
  showTotalMeal();
}

function removeItem(index) {
  basket.splice(index, 1);
  localStorage.setItem("basket", JSON.stringify(basket));
  showTotalMeal();
}

function calculateTotal() {
  let total = 0;

  for (let i = 0; i < basket.length; i++) {
    total += basket[i].price;
  }

  return total;
}
