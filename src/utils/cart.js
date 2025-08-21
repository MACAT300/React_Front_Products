// add product to cart
export function AddToCart(product) {
  let cart = getCart();
  const existing = cart.find((item) => item._id === product._id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCart(cart);
}

// get all the items in the cart
export function getCart() {
  const raw = localStorage.getItem("cart");
  try {
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.warn("cartfail。", e);
    return [];
  }
}

// update the cart to local storage
export function updateCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// delete item from the cart
export function deleteItemFromCart(id) {
  let cart = getCart();
  cart = cart.filter((item) => item._id !== id);
  updateCart(cart);
}
