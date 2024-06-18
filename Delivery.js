// JavaScript for redirecting on clicking 'Order Now'
document.querySelectorAll('.order-now').forEach(button => {
    button.addEventListener('click', () => {
      window.location.href = 'deliveryMenu.html'; // Assuming your menu page is deliveryMenu.html
    });
  });