import { setLocalStorage, getLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  /**
   * Initializes the product details page by fetching data and rendering.
   */
  async init() {
    // Fetch product data using the ID
    this.product = await this.dataSource.findProductById(this.productId);
    
    // Ensure product was found before rendering
    if (this.product) {
      this.renderProductDetails();
      
      // Add event listener to the "Add to Cart" button
      // .bind(this) is crucial to maintain the class context inside the method
      document.getElementById("addToCart")
        .addEventListener("click", this.addProductToCart.bind(this));
    } else {
      console.error("Product not found");
    }
  }

  /**
   * Adds the current product to the local storage cart.
   */
  addProductToCart() {
    // Retrieve current cart or initialize an empty array if null
    let cart = getLocalStorage("so-cart") || [];
    
    // Add the new product to the array
    cart.push(this.product);
    
    // Save the updated array back to local storage
    setLocalStorage("so-cart", cart);
    
    // Optional: Add a visual cue that the item was added
    alert(`${this.product.NameWithoutBrand} added to cart!`);
  }

  /**
   * Renders the product information into the HTML.
   */
  renderProductDetails() {
    // 1. Fix the image path for the public folder
    const imagePath = this.product.Image.replace("../", "/");

    // 2. Set the text and attributes
    document.querySelector(".product-detail__brand").textContent = this.product.Brand.Name;
    document.querySelector(".product-detail__name").textContent = this.product.NameWithoutBrand;

    const productImage = document.getElementById("productImage");
    productImage.src = imagePath;
    productImage.alt = this.product.Name;

    // 3. Calculate discount correctly
    const discountAmount = Math.round(
      ((this.product.SuggestedRetailPrice - this.product.FinalPrice) / this.product.SuggestedRetailPrice) * 100
    );

    document.getElementById("productPrice").textContent = `$${this.product.FinalPrice}`;
    document.getElementById("productDiscount").textContent = `${discountAmount}% off Retail Price`;
    document.getElementById("productColor").textContent = this.product.Colors[0].ColorName;
    document.getElementById("productDesc").innerHTML = this.product.DescriptionHtmlSimple;

    // Store the ID in a data attribute for tracking
    document.getElementById("addToCart").dataset.id = this.product.Id;
  }
}