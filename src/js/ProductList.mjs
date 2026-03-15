import { renderListWithTemplate } from "./utils.mjs";

/**
 * Template function to generate the HTML for a single product card.
 * @param {Object} product - The product data object.
 * @returns {string} - HTML string for the product card.
 */
function productCardTemplate(product) {
  // 1. Fix the image path: remove the '../' so it works correctly with the public folder
  // This ensures the browser looks in /images/ instead of trying to go up a directory
  const imagePath = product.Image.replace("../", "/");

  // 2. Calculate discount if applicable
  let hasDiscount = false;
  let discountAmount = 0;
  
  if (product.FinalPrice < product.SuggestedRetailPrice) {
    hasDiscount = true;
    // Calculation: ((Retail - Final) / Retail) * 100
    discountAmount = Math.round(
      ((product.SuggestedRetailPrice - product.FinalPrice) / product.SuggestedRetailPrice) * 100
    );
  }

  return `<li class="product-card">
    <a href="product_pages/index.html?product=${product.Id}">
      <img src="${imagePath}" alt="Image of ${product.Name}">
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
      <div class="container_price">
        <p class="product-card__price">$${product.FinalPrice}</p>
        ${hasDiscount ? `<p class="discount__price">${discountAmount}% off</p>` : ""}
      </div>
    </a>
  </li>`;
}

export default class ProductList {
  /**
   * @param {string} category - Category of products to display.
   * @param {Object} dataSource - Instance of ProductData class.
   * @param {HTMLElement} listElement - DOM element to render the list into.
   */
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  /**
   * Initializes the product list by fetching data and triggering the render.
   */
  async init() {
    // dataSource.getData() returns a Promise, so we use await to get the array
    const list = await this.dataSource.getData();
    
    // Render the list to the DOM
    this.renderList(list);
  }

  /**
   * Uses the utility function to render the provided list of products.
   * @param {Array} list - The list of products to display.
   */
  renderList(list) {
    // We pass the template function, the target element, and the data list
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}