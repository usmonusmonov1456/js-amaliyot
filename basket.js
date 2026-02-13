let getBasket = JSON.parse(localStorage.getItem("basket")) || [];
let a= prompt('ismingizni kiriting')
const cartItems = document.querySelector(".cart-items");
const subtotal = document.querySelector("#subtotal");
const totalAmount = document.querySelector(".total-amount");
const tax = document.querySelector("#tax");
const btn = document.querySelector(".checkout-btn");
let deliveryFee = 3.99;



function showBasket() {
  if (!cartItems) return;

  cartItems.innerHTML = "";

  getBasket.forEach((meal, index) => {

 
    if (!meal.quantity) {
      meal.quantity = 1;
    }

    cartItems.innerHTML += `
      <div class="cart-item">
        <img src="${meal.image}" alt="${meal.name}" class="item-image"/>

        <div class="item-details">
          <div class="item-header">
            <div>
              <h3 class="item-title">${meal.name}</h3>
              <p class="item-description">${meal.category}</p>
            </div>

            <button onclick="removeItem(${index})"
              style="background:red;color:white;border:none;padding:5px 10px;cursor:pointer;">
              x
            </button>
          </div>

          <div class="item-footer">
            <span class="item-price">
              $${(meal.price * meal.quantity).toFixed(2)}
            </span>

            <div class="quantity-controls">
              <button onclick="decreaseCount(${index})">-</button>
              <span>${meal.quantity}</span>
              <button onclick="increaseCount(${index})">+</button>
            </div>
          </div>
        </div>
      </div>
    `;
  });
}


function increaseCount(index) {
  getBasket[index].quantity++;
  updateStorage();
}


btn.addEventListener("click", function () {
  alert("hurmatli mijozimiz "+a+ " buyurtma berildi 30 sikunt ichida eshigingida boladi");
});


function decreaseCount(index) {
  if (getBasket[index].quantity > 1) {
    getBasket[index].quantity--;
  } else {
    getBasket.splice(index, 1);
  }
  updateStorage();
}



function removeItem(index) {
  getBasket.splice(index, 1);
  updateStorage();
}



function showTotalPrice() {
  if (!subtotal || !tax || !totalAmount) return;

  let countPrice = 0;

  getBasket.forEach((meal) => {
    countPrice += meal.price * meal.quantity;
  });

  subtotal.textContent = "$" + countPrice.toFixed(2);
  tax.textContent = "$" + (countPrice * 0.1).toFixed(2);
  totalAmount.textContent =
    "$" + (countPrice + countPrice * 0.1 + deliveryFee).toFixed(2);
}


function updateStorage() {
  localStorage.setItem("basket", JSON.stringify(getBasket));
  showBasket();
  showTotalPrice();
}


document.addEventListener("DOMContentLoaded", () => {
  showBasket();
  showTotalPrice();
});
