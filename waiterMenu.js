const menuItems = {
  'main-dishes': [
      { name: 'Chicken Biryani', price: 12, image: 'images/chicken-biryani.jpg' },
      { name: 'Beef Pilau', price: 10, image: 'images/beef-pilau.jpg' },
  ],
  'snacks': [
      { name: 'Samosa', price: 2, image: 'images/samosa.jpg' },
      { name: 'Chips', price: 3, image: 'images/chips.jpg' },
  ],
  'drinks': [
      { name: 'Coke', price: 1, image: 'images/coke.jpg' },
      { name: 'Juice', price: 2, image: 'images/juice.jpg' },
  ],
};

const menuItemsContainer = document.getElementById('menu-items');

document.getElementById('main-dishes-btn').addEventListener('click', () => {
  displayMenuItems('main-dishes');
});

document.getElementById('snacks-btn').addEventListener('click', () => {
  displayMenuItems('snacks');
});

document.getElementById('drinks-btn').addEventListener('click', () => {
  displayMenuItems('drinks');
});

function displayMenuItems(category) {
  menuItemsContainer.innerHTML = '';
  menuItems[category].forEach(item => {
      const menuItem = document.createElement('div');
      menuItem.className = 'menu-item';
      menuItem.innerHTML = `
          <img src="${item.image}" alt="${item.name}">
          <h3>${item.name}</h3>
          <p>$${item.price}</p>
          <button class="add-to-cart" data-name="${item.name}" data-price="${item.price}">Add to Cart</button>
      `;
      menuItemsContainer.appendChild(menuItem);
  });

  document.querySelectorAll('.add-to-cart').forEach(button => {
      button.addEventListener('click', addToCart);
  });
}

function addToCart(event) {
  const name = event.target.dataset.name;
  const price = event.target.dataset.price;
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push({ name, price });
  localStorage.setItem('cart', JSON.stringify(cart));
}

displayMenuItems('main-dishes');  // Display main dishes by default
