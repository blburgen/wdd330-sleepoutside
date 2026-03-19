import ShoppingCart from "./ShoppingCart.mjs";
import { loadHeaderFooter } from "./utils.mjs";

const cart = new ShoppingCart(document.querySelector(".cart-list"));
cart.init();

loadHeaderFooter();
