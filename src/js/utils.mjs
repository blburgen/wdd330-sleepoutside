// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click 
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export async function  getTentData  (){
  let response = await fetch("../json/tents.json")
  let data = await response.json()
    return data
}

export function getParam(param){
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param)
  return product;
}

export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false){
  if (clear) {
    parentElement.innerHTML = "";
  }

    const htmlStrings = list.map(templateFn);
    parentElement.insertAdjacentHTML(position, htmlStrings.join(""));

}

export function renderWithTemplate(template, parentElement, data, callback){
  parentElement.innerHTML = template;

  if(callback){
    callback(data);
  }
}

export async function loadTemplate(path){
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

export async function loadHeaderFooter(){
  const headerTemplate = await loadTemplate("../partials/header.html");
  const headerElement = document.querySelector("#main-header");
  renderWithTemplate(headerTemplate, headerElement);

  const footerTemplate = await loadTemplate("../partials/footer.html");
  const footerElement = document.querySelector("#main-footer");
  renderWithTemplate(footerTemplate, footerElement);
  updateCartCount();
}

export function alertMessage(message, scroll = true) {
  const alert = document.createElement('div');
  alert.classList.add('alert');
  alert.innerHTML = `<p>${message}</p><span>X</span>`;
  alert.addEventListener('click', (e) => {
    if (e.target.tagName === 'SPAN') {
      document.querySelector('main').removeChild(alert);
    }
  });
  document.querySelector('main').prepend(alert);
  if (scroll) window.scrollTo(0, 0);
}

export async function updateCartCount() {
  const cartItems = getLocalStorage("so-cart") || [];
  const badge = document.querySelector(".cart-count");

  badge.classList.remove('updated-item');
  void badge.offsetWidth;
  badge.classList.add('updated-item');

  if (badge) {
    badge.textContent = cartItems.length;
  }
}