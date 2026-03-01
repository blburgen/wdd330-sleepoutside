import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  let currentLocal = getLocalStorage("so-cart");

  if (currentLocal) {
    let cart = JSON.parse(currentLocal);
    cart.push(product);
    cart = JSON.stringify(cart);
    setLocalStorage("so-cart", cart);
  } else {
    let cart = [];
    cart.push(product);
    cart = JSON.stringify(cart);
    setLocalStorage("so-cart", cart);
  }
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
