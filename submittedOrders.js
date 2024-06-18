document.addEventListener('DOMContentLoaded', () => {
  const ordersContainer = document.getElementById('orders-container');
  const submittedOrders = JSON.parse(localStorage.getItem('submittedOrders')) || [];

  function renderOrders() {
      ordersContainer.innerHTML = '';
      submittedOrders.forEach((order, index) => {
          const orderDiv = document.createElement('div');
          orderDiv.className = 'order';

          const orderDetails = document.createElement('div');
          orderDetails.className = 'order-details';
          orderDetails.innerHTML = `
              <p>Type: ${order.orderType}</p>
              <p>Order No: ${order.orderNumber}</p>
              <p>Waiter: ${order.waiterName}</p>
              <p>Total: $${order.totalAmount.toFixed(2)}</p>
          `;

          const orderItems = document.createElement('div');
          orderItems.className = 'order-items';
          order.items.forEach(item => {
              const itemDiv = document.createElement('div');
              itemDiv.className = 'order-item';
              itemDiv.innerHTML = `
                  <span>${item.name} (${item.price})</span>
                  <input type="checkbox" class="item-checkbox" data-order-index="${index}">
              `;
              orderItems.appendChild(itemDiv);
          });

          const orderStatus = document.createElement('div');
          orderStatus.className = 'order-status';
          orderStatus.innerHTML = `
              <div class="checkbox">
                  <label>Served</label>
                  <input type="checkbox" class="served-checkbox" data-order-index="${index}">
              </div>
              <div class="checkbox">
                  <label>Delivered</label>
                  <input type="checkbox" class="delivered-checkbox" data-order-index="${index}">
              </div>
              <div class="checkbox">
                  <label>Paid</label>
                  <input type="checkbox" class="paid-checkbox" data-order-index="${index}">
              </div>
          `;

          orderDiv.appendChild(orderDetails);
          orderDiv.appendChild(orderItems);
          orderDiv.appendChild(orderStatus);
          ordersContainer.appendChild(orderDiv);
      });
  }

  ordersContainer.addEventListener('change', (event) => {
      const orderIndex = event.target.dataset.orderIndex;
      const order = submittedOrders[orderIndex];
      if (event.target.classList.contains('item-checkbox')) {
          const itemCheckboxes = document.querySelectorAll(`.item-checkbox[data-order-index="${orderIndex}"]`);
          const allChecked = Array.from(itemCheckboxes).every(checkbox => checkbox.checked);
          const servedCheckbox = document.querySelector(`.served-checkbox[data-order-index="${orderIndex}"]`);
          servedCheckbox.checked = allChecked;
          order.status.served = allChecked;
      } else if (event.target.classList.contains('served-checkbox')) {
          order.status.served = event.target.checked;
      } else if (event.target.classList.contains('delivered-checkbox')) {
          order.status.delivered = event.target.checked;
      } else if (event.target.classList.contains('paid-checkbox')) {
          order.status.paid = event.target.checked;
      }
      localStorage.setItem('submittedOrders', JSON.stringify(submittedOrders));
  });

  renderOrders();
});
