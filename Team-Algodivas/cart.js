const cartItemsContainer = document.getElementById('cart-items');
const cart = JSON.parse(localStorage.getItem('cart')) || [];

function displayCart() {
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
  } else {
    cart.forEach((item, index) => {
      cartItemsContainer.innerHTML += `
        <div>
          ${item.name} - $${item.price.toFixed(2)}
          <button onclick="removeFromCart(${index})">Remove</button>
        </div>
      `;
    });
  }
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
  location.reload(); // Refresh to update the display
}

displayCart();
