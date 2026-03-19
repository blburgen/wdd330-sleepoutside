import { getLocalStorage, setLocalStorage, renderListWithTemplate } from "./utils.mjs";

function renderCartContents(cartItems) {
    //const cartItems = getLocalStorage("so-cart");
  if (!cartItems || cartItems.length === 0) {
    hideCartTotal();
    document.querySelector(".cart-list").innerHTML = "Your Cart is Empty";
  } else {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    const cartTotalPrice = cartItems.reduce(
      (accumulator, item) => accumulator + item.FinalPrice,
      0,
    );
    setCardTotal(cartTotalPrice);
    document.querySelector(".cart-list").innerHTML = htmlItems.join("");
    addRemoveListeners();
  }

    const newItem = `
        <li class="cart-card divider">
        <button class="cart-card__remove" type="button" data-id="${item.Id}" aria-label="Remove ${item.Name} from cart">X</button>
        <a href="#" class="cart-card__image">
            <img
            src="${item.Image}"
            alt="${item.Name}"
            />
        </a>
        <a href="#">
            <h2 class="card__name">${item.Name}</h2>
        </a>
        <p class="cart-card__color">${item.Colors[0].ColorName}</p>
        <p class="cart-card__quantity">qty: 1</p>
        <p class="cart-card__price">$${item.FinalPrice}</p>
        </li>`;

    return newItem;
}

export default class ShoppingCart {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
        const list = await this.dataSource.getData();
        this.renderList(list);
    }

    renderList(list) {
        renderListWithTemplate(renderCartContents, this.listElement, list);
    }
}


export function addRemoveListeners() {
  document.querySelectorAll(".cart-card__remove").forEach((button) => {
    button.addEventListener("click", handleRemoveItem);
  });
}

function handleRemoveItem(event) {
  const id = event.currentTarget.dataset.id;
  if (!id) return;
  const cartItems = getLocalStorage("so-cart") || [];
  const updatedItems = cartItems.filter((item) => item.Id !== id);
  setLocalStorage("so-cart", updatedItems);
  renderCartContents();
}

export function setCardTotal(total) {
  const cartPriceEl = document.querySelector(".cart-total");
  cartPriceEl.classList.remove("hide");
  cartPriceEl.textContent = `Total: $${total}`;
}

export function hideCartTotal() {
  const cartPriceEl = document.querySelector(".cart-total");
  cartPriceEl.classList.add("hide");
}