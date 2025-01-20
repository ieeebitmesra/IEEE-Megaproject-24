fetch('./products.json')
  .then(response => response.json())
  .then(products => {
    const biscuitProducts = products.filter(product => product.type.toLowerCase() === 'biscuit');
    displayProducts(biscuitProducts);
  })
  .catch(error => console.error('Error loading products:', error));

function displayProducts(products) {
  const productDisplay = document.getElementById('productDisplay');
  const productTemplate = document.getElementById('productTemplate');

  productDisplay.innerHTML = ""; // Clear current products

  products.forEach(product => {
      const productCard = productTemplate.content.cloneNode(true).querySelector('.product-card');

      productCard.id = `product${product.id}`;  // Setting the id of productCard directly.

      productCard.querySelector('img').src = product.image;
      productCard.querySelector('img').alt = product.name;
      productCard.querySelector('h3').textContent = product.name;
      productCard.querySelector('p').textContent = product.description;
      productCard.querySelector('.price1').textContent = product.price1;
      productCard.querySelector('.price1').parentElement.href = product.l1;
      productCard.querySelector('.price2').textContent = product.price2;
      productCard.querySelector('.price2').parentElement.href = product.l2;

      const heart=productCard.querySelector(".add-to-cart-button");

      const isLiked = localStorage.getItem(`liked-${product.id}`) === 'true';
      if (isLiked) {
          heart.classList.add('liked');
      }
      
        heart.addEventListener("click", () => {
          addToCart(product.id);
          const isCurrentlyLiked = heart.classList.toggle('liked');
          if (isCurrentlyLiked) {
              localStorage.setItem(`liked-${product.id}`, 'true');
          } else {
              localStorage.removeItem(`liked-${product.id}`);
          }
        }
        );

      productDisplay.appendChild(productCard);
  });
}


function addToCart(id) {
  
  let arrLocalStorageProduct = getCartProductFromLS();
  const currentProdElem = document.getElementById(`product${id}`);

  
  let existingProd = arrLocalStorageProduct.find(
    (curProd) => curProd.id === id
  );

  console.log(existingProd);

  if (existingProd) {
    arrLocalStorageProduct = arrLocalStorageProduct.filter((curProd) => curProd.id !== id);
    console.log('Product already in cart:', existingProd);


  } else {
    
    arrLocalStorageProduct.push({ id});
    console.log('Product added to cart:', { id});
  }

  // Save the updated cart to localStorage
  localStorage.setItem("cartProductLS", JSON.stringify(arrLocalStorageProduct));
}


function getCartProductFromLS(){
  let cartProducts = localStorage.getItem("cartProductLS");
  if (!cartProducts) {
    return [];
  }
  cartProducts = JSON.parse(cartProducts);
  return cartProducts;
}

// Function to filter products based on user input
function filterProducts() {
    const searchBar = document.getElementById('searchBar');
    const query = searchBar.value.toLowerCase(); // Convert input to lowercase
    fetch('./products.json')
    .then(response => response.json())
    .then(products => {
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
    );

    displayProducts(filteredProducts);
  })
  .catch(error => console.error('Error loading products:', error)); // Display the filtered products
}

