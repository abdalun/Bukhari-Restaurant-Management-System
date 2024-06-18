document.querySelector('.take-order-btn').addEventListener('click', () => {
  const orderType = document.getElementById('order-type').value;
  const orderNumber = document.getElementById('order-number').value;
  const waiterName = document.getElementById('waiter-name').value;

  localStorage.setItem('orderType', orderType);
  localStorage.setItem('orderNumber', orderNumber);
  localStorage.setItem('waiterName', waiterName);

  window.location.href = 'waiterMenu.html';
});
