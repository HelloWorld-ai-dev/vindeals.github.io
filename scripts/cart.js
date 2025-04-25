// cart.js

// Initialize cart or get from localStorage
let cart = JSON.parse(localStorage.getItem("cartItems")) || [];

// Add item to cart with animation
function addToCart(name, priceStr, imageSelector) {
  const price = parseFloat(priceStr.replace('$', ''));
  const existing = cart.find(item => item.name === name);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1 });
  }

  localStorage.setItem("cartItems", JSON.stringify(cart));
  animateToCart(imageSelector);
}

// Animate the image to the cart icon
function animateToCart(imageSelector) {
  const image = document.querySelector(imageSelector);
  const cartIcon = document.querySelector("#cartIcon");
  if (!image || !cartIcon) return;

  const imgClone = image.cloneNode(true);
  const rect = image.getBoundingClientRect();
  const cartRect = cartIcon.getBoundingClientRect();

  imgClone.style.position = "fixed";
  imgClone.style.zIndex = 1000;
  imgClone.style.top = rect.top + "px";
  imgClone.style.left = rect.left + "px";
  imgClone.style.width = rect.width + "px";
  imgClone.style.transition = "all 0.8s ease-in-out";

  document.body.appendChild(imgClone);

  setTimeout(() => {
    imgClone.style.top = cartRect.top + "px";
    imgClone.style.left = cartRect.left + "px";
    imgClone.style.width = "0px";
    imgClone.style.opacity = "0";
  }, 10);

  setTimeout(() => {
    imgClone.remove();
  }, 900);
}

// Render cart on cart.html
function renderCart() {
  const cartItemsContainer = document.getElementById("cartItems");
  const cartTotalDisplay = document.getElementById("cartTotal");
  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    cartTotalDisplay.innerText = "0.00";
    return;
  }

  let total = 0;
  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const itemDiv = document.createElement("div");
    itemDiv.innerHTML = \`
      <p><strong>\${item.name}</strong> - \$\${item.price.toFixed(2)} × \${item.quantity} = \$\${itemTotal.toFixed(2)}
      <button onclick="removeFromCart(\${index})">Remove</button></p>
    \`;
    cartItemsContainer.appendChild(itemDiv);
  });

  cartTotalDisplay.innerText = total.toFixed(2);
}

// Remove item from cart
function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cartItems", JSON.stringify(cart));
  renderCart();
}
