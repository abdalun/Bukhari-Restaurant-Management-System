document.addEventListener('DOMContentLoaded', () => {
  const cartItemsContainer = document.getElementById('cart-items');
  const totalPriceElement = document.getElementById('total-price');

  // Function to display cart items
  function displayCartItems() {
      // Clear current cart items
      cartItemsContainer.innerHTML = '';

      // Retrieve cart from local storage
      const cart = JSON.parse(localStorage.getItem('cart')) || [];

      let total = 0;

      // Populate with cart items
      cart.forEach((item, index) => {
          const itemDiv = document.createElement('div');
          itemDiv.classList.add('cart-item');

          itemDiv.innerHTML = `
              <img src="${item.image}" alt="${item.name}">
              <div class="details">
                  <h3>${item.name}</h3>
                  <p class="price">$${item.price}</p>
              </div>
              <div class="quantity">
                  <button class="decrease-quantity">-</button>
                  <span>${item.quantity}</span>
                  <button class="increase-quantity">+</button>
              </div>
              <button class="remove">Remove</button>
          `;

          // Calculate total price
          total += item.price * item.quantity;

          // Add event listeners for quantity buttons and remove button
          itemDiv.querySelector('.decrease-quantity').addEventListener('click', () => {
              if (item.quantity > 1) {
                  item.quantity--;
                  updateCart(cart);
              }
          });

          itemDiv.querySelector('.increase-quantity').addEventListener('click', () => {
              item.quantity++;
              updateCart(cart);
          });

          itemDiv.querySelector('.remove').addEventListener('click', () => {
              cart.splice(index, 1);
              updateCart(cart);
          });

          cartItemsContainer.appendChild(itemDiv);
      });

      // Update total price
      totalPriceElement.textContent = total.toFixed(2);
  }

  // Function to update cart in local storage and re-display items
  function updateCart(cart) {
      localStorage.setItem('cart', JSON.stringify(cart));
      displayCartItems();
  }

  // Initial display of cart items
  displayCartItems();
});