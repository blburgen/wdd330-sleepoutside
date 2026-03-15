/**
 * Wrapper for querySelector... returns matching element
 * @param {string} selector - The CSS selector.
 * @param {HTMLElement} parent - The parent element to search within.
 * @returns {HTMLElement} - The found element.
 */
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

/**
 * Retrieve data from localstorage
 * @param {string} key - The key to look for.
 * @returns {Object|null} - The parsed JSON data or null.
 */
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

/**
 * Save data to local storage
 * @param {string} key - The key to save.
 * @param {Object} data - The data to store.
 */
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

/**
 * Set a listener for both touchend and click
 * @param {string} selector - The CSS selector for the element.
 * @param {Function} callback - The function to run on click/touch.
 */
export function setClick(selector, callback) {
  const element = qs(selector);
  if (element) {
    element.addEventListener("touchend", (event) => {
      event.preventDefault();
      callback();
    });
    element.addEventListener("click", callback);
  }
}

/**
 * Get a parameter from the URL query string
 * @param {string} param - The parameter name.
 * @returns {string|null} - The parameter value.
 */
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

/**
 * Renders a list of items using a template function.
 * @param {Function} templateFn - The function that returns the HTML string.
 * @param {HTMLElement} parentElement - The target element to render into.
 * @param {Array} list - The list of items to render.
 * @param {string} position - Where to insert the HTML (default: afterbegin).
 * @param {boolean} clear - Whether to clear the parent element first.
 */
export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false
) {
  if (clear && parentElement) {
    parentElement.innerHTML = "";
  }
  const htmlStrings = list.map(templateFn);
  if (parentElement) {
    parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
  }
}

/**
 * Updates the cart icon notification with the current number of items.
 * Use this after adding or removing items from the cart.
 */
export function updateCartCount() {
  const cartItems = getLocalStorage("so-cart") || [];
  const countElement = document.querySelector(".cart-count");
  
  if (countElement) {
    const count = cartItems.length;
    countElement.textContent = count;
    // Toggle visibility based on cart status
    countElement.style.display = count > 0 ? "block" : "none";
  }
}