import { getLocalStorage, setLocalStorage, renderListWithTemplate } from "./utils.mjs";

function cartItemTemplate(item) {
  return `<li class="cart-card divider">
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
}

export default class ShoppingCart {
  constructor(listElement) {
    this.listElement = listElement;
  }

  init() {
    const cartItems = getLocalStorage("so-cart");
    this.renderList(cartItems);
  }

  renderList(list) {
    if (!list || list.length === 0) {
      hideCartTotal();
      this.listElement.innerHTML = "Your Cart is Empty";
    } else {
      renderListWithTemplate(cartItemTemplate, this.listElement, list, "afterbegin", true);
      const total = list.reduce((sum, item) => sum + item.FinalPrice, 0);
      setCardTotal(total);
      this.addRemoveListeners();
    }
  }

  addRemoveListeners() {
    this.listElement.querySelectorAll(".cart-card__remove").forEach((button) => {
      button.addEventListener("click", (event) => this.handleRemoveItem(event));
    });
  }

  handleRemoveItem(event) {
    const id = event.currentTarget.dataset.id;
    if (!id) return;
    const cartItems = getLocalStorage("so-cart") || [];
    const updatedItems = cartItems.filter((item) => item.Id !== id);
    setLocalStorage("so-cart", updatedItems);
    this.renderList(updatedItems);
  }
}

function setCardTotal(total) {
  const cartPriceEl = document.querySelector(".cart-total");
  cartPriceEl.classList.remove("hide");
  cartPriceEl.textContent = `Total: $${total}`;
}

function hideCartTotal() {
  const cartPriceEl = document.querySelector(".cart-total");
  cartPriceEl.classList.add("hide");
}
