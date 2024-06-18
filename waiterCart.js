document.addEventListener('DOMContentLoaded', () => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartItemsContainer = document.getElementById('cart-items');
  const totalPriceElement = document.getElementById('total-price');

  function renderCartItems() {
      cartItemsContainer.innerHTML = '';
      let totalPrice = 0;

      cart.forEach((item, index) => {
          const cartItem = document.createElement('div');
          cartItem.className = 'cart-item';
          cartItem.innerHTML = `
              <span>${item.name}</span>
              <span>$${item.price}</span>
          `;
          cartItemsContainer.appendChild(cartItem);
          totalPrice += parseFloat(item.price);
      });

      totalPriceElement.textContent = totalPrice.toFixed(2);
  }

  document.querySelector('.submit-order').addEventListener('click', () => {
      const orderType = localStorage.getItem('orderType');
      const orderNumber = localStorage.getItem('orderNumber');
      const waiterName = localStorage.getItem('waiterName');
      const totalAmount = parseFloat(totalPriceElement.textContent);

      const order = {
          orderType,
          orderNumber,
          waiterName,
          items: cart,
          totalAmount,
          status: {
              served: false,
              delivered: false,
              paid: false,
          },
      };

      const submittedOrders = JSON.parse(localStorage.getItem('submittedOrders')) || [];
      submittedOrders.push(order);
      localStorage.setItem('submittedOrders', JSON.stringify(submittedOrders));
      localStorage.removeItem('cart');
      window.location.href = 'submittedOrders.html';
  });

  renderCartItems();
});
