let arrMeals = [];

async function getMeals() {
  try {
    const response = await fetch("./quotes.json");

    const meals = await response.json();

    arrMeals = meals;

    showMeals();

  } catch (error) {
    console.log(error);
  }
}

getMeals();

const cardContainer = document.querySelector(".cards-grid");

function showMeals() {
  console.log(arrMeals)
  arrMeals.forEach((meal, index) => {
    cardContainer.innerHTML += `
      <div class="card">
        <div class="card-image-container">
          <img
            src=${meal.image}
            alt="Pizza"
            class="card-image"
          />
          ${
            meal.badge != null
              ? `<span class="card-badge">${meal.badge}</span>`
              : ""
          }
        </div>
        <div class="card-content">
          <h2 class="card-title">${meal.name}</h2>
          <p class="card-description">
            ${meal.category}
          </p>
          <div class="card-footer">
            <span class="card-price">$${meal.price}</span>
            <button class="add-to-cart-btn" onclick="addToCard(${index})">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    `;
  });
}

const basket = JSON.parse(localStorage.getItem("basket")) || [];
const cartCount = document.querySelector(".cart-count");

function showTotalMeal() {
  cartCount.textContent = basket.length;
}

showTotalMeal();

function addToCard(index) {
  basket.push(arrMeals[index]);

  localStorage.setItem("basket", JSON.stringify(basket));
  showTotalMeal();
}

