export default class ProductDetails{
    constructor(category) {
    this.category = category;
    this.path = `../json/${this.category}.json`;
  }
}

