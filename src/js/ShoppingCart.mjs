import { getLocalStorage, setLocalStorage, renderListWithTemplate, updateCartCount } from "./utils.mjs";

function cartItemTemplate(item) {

    return `
    <li class="cart-card divider">
        <button class="cart-card__remove" type="button" data-id="${item.Id}" aria-label="Remove ${item.Name} from cart">X</button>
        <a href="#" class="cart-card__image">
            <img
                src="${item.Images.PrimaryLarge}"
                alt="${item.Name}"
            />
        </a>
        <a href="#">
            <h2 class="card__name">${item.Name}</h2>
        </a>
        <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    
        <div class="cart-card__quantity-controls">
            <button class="cart-card__quantity-control_btn" data-id="${item.Id}" data-change="subtract">-</button>
            <p class="cart-card__quantity" data-id="${item.Id}"></p>
            <button class="cart-card__quantity-control_btn" data-id="${item.Id} data-change="add">+</button>
        </div>
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

            this.setQuantity();
            setCardTotal();
            this.addRemoveListeners();
            this.addChangeQuantity();
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
        updateCartCount();
    }
    setQuantity() {
        document.querySelectorAll(".cart-card__quantity").forEach(el => {
            let id = el.dataset.id
            let quantity = sessionStorage.getItem(id)
            if (!quantity) {
                sessionStorage.setItem(id, 1)
            }
            el.textContent = sessionStorage.getItem(id)
        })
    }

    addChangeQuantity() {

        this.listElement.querySelectorAll(".cart-card__quantity-control_btn").forEach((button) => {
            button.addEventListener("click", (event) => this.handleChangeQuantity(event));
        });
    }

    handleChangeQuantity(event) {
        let currentTarget = event.currentTarget
        let parent = currentTarget.parentElement
        let quantityEl = parent.querySelector("p")
        let operation = currentTarget.textContent
        let id = quantityEl.dataset.id
        let quantity = parseInt(sessionStorage.getItem(id))


        if (operation == "+") {
            quantity = quantity + 1
            quantityEl.textContent = quantity
            sessionStorage.setItem(id, quantity)
            setCardTotal()

        } else {
            quantity = quantity - 1
            if (quantity > 0) {
                quantityEl.textContent = quantity
                sessionStorage.setItem(id, quantity)
                setCardTotal()
            }
        }
    }
}

function setCardTotal() {
    let list = JSON.parse(localStorage.getItem("so-cart"))
    const total = list.reduce((sum, item) => {
        let price = item.FinalPrice
        let quantity = sessionStorage.getItem(item.Id)
        return sum + (price * quantity)
    }, 0)
    localStorage.setItem("total",total)
    const cartPriceEl = document.querySelector(".cart-total");
    cartPriceEl.classList.remove("hide");
    cartPriceEl.textContent = `Total: $${total.toFixed(2)}`;
}

function hideCartTotal() {
    const cartPriceEl = document.querySelector(".cart-total");
    cartPriceEl.classList.add("hide");
}