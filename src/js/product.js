import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

// 1. Initialize the data source for the "tents" category
const dataSource = new ProductData("tents");

// 2. Get the product ID from the URL parameters (e.g., ?product=880RR)
const productId = getParam("product");

// 3. Create an instance of ProductDetails
const product = new ProductDetails(productId, dataSource);

// 4. Initialize the product details logic
// This will fetch the data, render the HTML, and add the event listeners
product.init();