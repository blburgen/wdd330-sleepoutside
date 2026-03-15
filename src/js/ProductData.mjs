/**
 * Helper function to validate the fetch response and convert it to JSON.
 * @param {Response} res - The fetch response object from a fetch call.
 * @returns {Promise<Object>} - The parsed JSON data if the response is OK.
 * @throws {Error} - Throws an error if the network response was not successful.
 */
function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  /**
   * Constructs the data source for a specific category of products.
   * @param {string} category - The category name (e.g., 'tents', 'backpacks').
   */
  constructor(category) {
    this.category = category;
    // Files inside 'src/public/json/' are served directly from the root '/' in Vite
    this.path = `/json/${this.category}.json`;
  }

  /**
   * Fetches the data from the local JSON file.
   * @returns {Promise<Array>} - A promise that resolves to an array of product objects.
   */
  getData() {
    return fetch(this.path)
      .then(convertToJson)
      .then((data) => data);
  }

  /**
   * Retrieves a single product object from the data source based on its ID.
   * @param {string} id - The unique identifier for the product.
   * @returns {Promise<Object>} - The product object that matches the ID.
   */
  async findProductById(id) {
    const products = await this.getData();
    return products.find((item) => item.Id === id);
  }
}