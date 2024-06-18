const menuData = {
  mainDishes: [
      {
          image: 'images/Chips Plain.jpg',
          name: 'Chips Plain',
          description: 'Crunchy French Fries',
          price: '2000'
      },
      {
          image: 'images/grilled chicken.jpg',
          name: 'Chicken',
          description: 'Spicy and Tasty, have a try!',
          price: '6000'
      },
      // Add more main dishes as needed
  ],
  snacks: [
      {
          image: 'images/Chips Plain.jpg',
          name: 'Sambusa',
          description: 'Crispy with plenty meat',
          price: '500'
      },
      {
          image: 'images/grilled chicken.jpg',
          name: 'Bhajia',
          description: 'Thick and Spicy',
          price: '500'
      },
      // Add more snacks as needed
  ],
  drinks: [
      {
          image: 'images/Chips Plain.jpg',
          name: 'Mojito',
          description: 'Cold and amazing',
          price: '3000'
      },
      {
          image: 'images/grilled chicken.jpg',
          name: 'Tende Shake',
          description: 'Thick and sweet',
          price: '3000'
      },
      // Add more drinks as needed
  ]
};

let cart = [];

document.addEventListener('DOMContentLoaded', () => {
  const menuItemsContainer = document.getElementById('menu-items');
  const mainDishesBtn = document.getElementById('main-dishes-btn');
  const snacksBtn = document.getElementById('snacks-btn');
  const drinksBtn = document.getElementById('drinks-btn');

  // Function to display menu items
  function displayMenuItems(items) {
      // Clear current menu items
      menuItemsContainer.innerHTML = '';

      // Populate with new items
      items.forEach(item => {
          const itemDiv = document.createElement('div');
          itemDiv.classList.add('menu-item');

          itemDiv.innerHTML = `
              <img src="${item.image}" alt="${item.name}">
              <h3>${item.name}</h3>
              <p>${item.description}</p>
              <div class="price">$${item.price}</div>
              <button class="add-to-cart">Add to Cart</button>
          `;

          // Adding event listener to the "Add to Cart" button
          itemDiv.querySelector('.add-to-cart').addEventListener('click', () => {
              addToCart(item);
          });

          menuItemsContainer.appendChild(itemDiv);
      });
  }

  // Function to add item to cart
  function addToCart(item) {
    // Retrieve cart from local storage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if the item already exists in the cart
    const existingItem = cart.find(cartItem => cartItem.name === item.name);

    if (existingItem) {
        // If it exists, increase the quantity
        existingItem.quantity++;
    } else {
        // If it doesn't exist, add the item with a quantity of 1
        cart.push({ ...item, quantity: 1 });
    }

    // Save updated cart to local storage
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log(cart); // For debugging
  }

  // Event listeners for section buttons
  mainDishesBtn.addEventListener('click', () => displayMenuItems(menuData.mainDishes));
  snacksBtn.addEventListener('click', () => displayMenuItems(menuData.snacks));
  drinksBtn.addEventListener('click', () => displayMenuItems(menuData.drinks));

  // Load main dishes by default
  displayMenuItems(menuData.mainDishes);
});