const getBasket = JSON.parse(localStorage.getItem("basket"));

const cartItems = document.querySelector(".cart-items");

function showBasket() {
  getBasket.forEach((meal) => {
    cartItems.innerHTML += `
      <div class="cart-item">
        <img
          src=${meal.image}
          alt=${meal.name}
          class="item-image"
        />
        <div class="item-details">
          <div>
            <div class="item-header">
              <div>
                <h3 class="item-title">${meal.name}</h3>
                <p class="item-description">
                  ${meal.category}
                </p>
              </div>
              <button class="remove-btn">×</button>
            </div>
          </div>
          <div class="item-footer">
            <span class="item-price">$${meal.price}</span>
            <div class="quantity-controls">
              <button class="quantity-btn">-</button>
              <span class="quantity-number">${meal.count}</span>
              <button class="quantity-btn">+</button>
            </div>
          </div>
        </div>
      </div>
    `;
  });
}

showBasket();

const subtotal = document.querySelector("#subtotal");
const totalAmount = document.querySelector(".total-amount");
const tax = document.querySelector("#tax");

let countPrice = 0;
let deliveryFee = 3.99;

function showTotalPrice() {
  getBasket.forEach((meal) => {
    countPrice += meal.price;
  });

  subtotal.textContent = "$" + countPrice;
  tax.textContent = "$" + (countPrice / 10).toFixed(2);
  totalAmount.textContent =
    "$" + (countPrice + countPrice / 10 + deliveryFee).toFixed(2);
}

showTotalPrice();
