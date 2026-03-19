import { setLocalStorage, getLocalStorage, updateCartCount } from "./utils.mjs";

export default class ProductDetails{
  constructor(productId, dataSource){
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init(){
    // use the datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
    this.product = await this.dataSource.findProductById(this.productId);
    // the product details are needed before rendering the HTML
    this.renderProductDetails();
    // once the HTML is rendered, add a listener to the Add to Cart button
    // Notice the .bind(this). This callback will not work if the bind(this) is missing. Review the readings from this week on 'this' to understand why.
    document.getElementById('addToCart')
      .addEventListener('click', this.addProductToCart.bind(this));
    console.log(this.product.Category);
    document.querySelector("#product-breadcrumbs").textContent = this.product.Category;
  }

  addProductToCart(){
    let cart = getLocalStorage("so-cart");
    
    if (cart) {
      cart.push(this.product);
      setLocalStorage("so-cart", cart);
    } else {
      cart = [];
      cart.push(this.product);
      setLocalStorage("so-cart", cart);
    }
    updateCartCount();
  }
   
  renderProductDetails(){
    document.querySelector('h2').textContent = this.product.Brand.Name;
    document.querySelector('h3').textContent = this.product.NameWithoutBrand;

    const productImage = document.getElementById('productImage');
    productImage.src = this.product.Images.PrimaryLarge;
    productImage.alt = this.product.NameWithoutBrand;

    const productDiscount = Math.round((this.product.FinalPrice / this.product.SuggestedRetailPrice) * 100 - 100);

    document.getElementById('productPrice').textContent = this.product.FinalPrice;
    document.getElementById('productDiscount').textContent = `${productDiscount}% off Retail Price`;
    document.getElementById('productColor').textContent = this.product.Colors[0].ColorName;
    document.getElementById('productDesc').innerHTML = this.product.DescriptionHtmlSimple;

    document.getElementById('addToCart').dataset.id = this.product.Id;
  }

  
}




