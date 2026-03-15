import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

// Initialize the data source for the "tents" category
const dataSource = new ProductData("tents");

// Select the HTML element where the list will be rendered
const listElement = document.querySelector(".product-list");

// Create an instance of the ProductList class
// We pass the category, data source, and the target DOM element
const listing = new ProductList("tents", dataSource, listElement);

// Initialize the listing to fetch data and render the cards
// We check if the element exists first to avoid console errors
if (listElement) {
  listing.init();
} else {
  console.error("Error: Target element '.product-list' not found in the DOM.");
}