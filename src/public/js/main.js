import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import ShoppingCart from "./ShoppingCart.mjs";
import { loadHeaderFooter } from "./utils.mjs";

const dataSource = new ProductData("tents");
const listElement = document.querySelector(".product-list");
const productList = new ProductList("tents", dataSource, listElement);
productList.init();

const cartDataSource = new ShoppingCart("so-cart");
const cartListElement = document.querySelector(".cart-list");
const shoppingCart = new ShoppingCart("so-cart", dataSource, listElement);
shoppingCart.init();

loadHeaderFooter();
