fetch('./components/products.json')
  .then(response => response.json())  // Fetch and parse the products JSON
  .then(products => {
    // Get cart products from localStorage
    const cartProducts = getCartProductFromLS();

    // Filter products that exist in the cart
    const filterProducts = products.filter(product => 
      cartProducts.some(cartItem => cartItem.id === product.id)
    );

    // Display filtered products
    displayProducts(filterProducts);
  })
  .catch(error => console.error('Error loading products:', error));

// Function to get cart products from localStorage
function getCartProductFromLS() {
  let cartProducts = localStorage.getItem("cartProductLS");
  if (!cartProducts) {
    return [];  
  }

  try {
    return JSON.parse(cartProducts);  
  } catch (error) {
    console.error("Error parsing cart products from localStorage:", error);
    return []; 
  }
}

function displayProducts(products) {
    const cardElement = document.getElementById('productCartContainer');
    const templateContainer = document.getElementById('productTemplate');
  
    cardElement.innerHTML = ""; // Clear current products
  
    products.forEach((curProd) => {
        const { category, id, image, name, type, price1,price2,description, l1,l2 } = curProd;
        let productClone = document.importNode(templateContainer.content, true);
  
        productClone.querySelector("#cardValue").setAttribute("id", `card${id}`);
  
        productClone.querySelector(".productName").textContent = name;
        productClone.querySelector(".productImage").src = image;
        productClone.querySelector(".productImage").alt = name;
        productClone.querySelector(".productDescription").textContent = description;
        productClone.querySelector('.price1').textContent = price1;
        productClone.querySelector('.price1').parentElement.href = l1;
        productClone.querySelector('.price2').textContent = price2;
        productClone.querySelector('.price2').parentElement.href = l2;
        productClone
      .querySelector(".remove-to-cart-button")
      .addEventListener("click", () => {
        removeProdFromCart(products,id);
        const isCurrentlyLiked = localStorage.getItem(`liked-${id}`) === 'true';
        if (isCurrentlyLiked) {
            // Remove from wishlist
            localStorage.removeItem(`liked-${id}`);
        }
      });

    cardElement.appendChild(productClone);
  });
  
  }

function removeProdFromCart(products,id){
    let cartProducts = getCartProductFromLS();
  cartProducts = cartProducts.filter((curProd) => curProd.id !== id);

  // update the localStorage after removing the item
  localStorage.setItem("cartProductLS", JSON.stringify(cartProducts));

  

  let removeDiv = document.getElementById(`card${id}`);
  if (removeDiv) {
    removeDiv.remove();

    //show toast when product added to the cart
    showToast("delete", id);
  }
}
function showToast(operation,id){
    const toast = document.createElement("div");
  toast.classList.add("toast");

  // Set the text content of the toast based on the operation
  if (operation === "add") {
    toast.textContent = `Product with ID ${id} has been added.`;
  } else {
    toast.textContent = `Product with ID ${id} has been deleted.`;
  }

  document.body.appendChild(toast);

  // Automatically remove the toast after a few seconds
  setTimeout(() => {
    toast.remove();
  }, 2000);
}

