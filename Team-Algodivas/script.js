function show1()
{
    document.getElementById('biscuitID').style.display = "flex";
    document.getElementById('biscuitID').style.justifyContent = "space-around";
    document.getElementById('chocolateID').style.display="none";
    
}
function show2()
{
    document.getElementById('biscuitID').style.display = "none";
    
    
}
function show3()
{
    document.getElementById('chocolateID').style.display = "flex";
    document.getElementById('chocolateID').style.justifyContent = "space-around";
    document.getElementById('biscuitID').style.display = "none";
    
}
function show4()
{
    document.getElementById('chocolateID').style.display = "none";
      
}

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productName, price) {
  const product = { name: productName, price: price };
  cart.push(product);
  localStorage.setItem('cart', JSON.stringify(cart)); // Save cart to localStorage
  updateCartCount();
  alert(`${productName} has been added to your cart.`);
}

function updateCartCount() {
  document.getElementById('cart-count').textContent = `(${cart.length})`;
}
