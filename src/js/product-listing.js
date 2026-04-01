import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

loadHeaderFooter();

const category = getParam("category");
const seachItem = getParam("searchItem");

if (seachItem) {
  const dataSource = new ProductData();
  const listElement = document.querySelector(".product-list");
  const productList = new ProductList(seachItem, dataSource, listElement, true);
  productList.init();
} else {
  const dataSource = new ProductData();
  const listElement = document.querySelector(".product-list");
  const productList = new ProductList(category, dataSource, listElement, false);
  productList.init();
}
