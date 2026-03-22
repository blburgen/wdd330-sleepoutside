import { getLocalStorage, setLocalStorage, renderListWithTemplate, updateCartCount } from "./utils.mjs";

function cartItemTemplate(item) {

    let quantity = 1
    let itemTotalPrice = item.FinalPrice
    sessionStorage.setItem("quantity",quantity )
    sessionStorage.setItem("total",)
    //! Convert this do obj to access coresponding btns to update quantity
    const li = document.createElement("li")
    const removeBtn = document.createElement("button")
    const imageLink = document.createElement("a")
    const itemImage = document.createElement("img")
    const itemNameLink = document.createElement("a")
    const itemName = document.createElement("h2")
    const colorDescription = document.createElement("p")
    const quantityControlsDiv = document.createElement("div")
    const increaseBtn = document.createElement("btn")
    const quantityOfItems = document.createElement("p")
    const decreaseBtn = document.createElement("btn")
    const itemPrice = document.createElement("p")

    li.appendChild(removeBtn)

    imageLink.appendChild(itemImage)
    li.appendChild(imageLink)

    itemNameLink.appendChild(itemName)
    li.appendChild(itemNameLink)

    li.appendChild(colorDescription)
    quantityControlsDiv.appendChild(decreaseBtn)
    quantityControlsDiv.appendChild(quantityOfItems)
    quantityControlsDiv.appendChild(increaseBtn)
    li.appendChild(quantityControlsDiv)
    li.appendChild(itemPrice)

    li.classList.add("cart-card")
    li.classList.add("divider")

    removeBtn.classList.add("cart-card__remove")
    removeBtn.type = "button"
    removeBtn.setAttribute("data-id",item.id)
    removeBtn.setAttribute("aria-label",`Remove ${item.Name} from cart`)
    removeBtn.textContent = "X"

    imageLink.classList.add("cart-card__image")
    imageLink.setAttribute("href","#")
    itemImage.setAttribute("src",item.Images.PrimaryLarge)
    itemImage.setAttribute("alt",item.Name)

    itemNameLink.setAttribute("href","#")
    itemName.classList.add("card__name")
    itemName.textContent = item.Name

    colorDescription.classList.add("cart-card__color")
    colorDescription.textContent = item.Colors[0].ColorName

    quantityControlsDiv.classList.add("cart-card__quantity-controls")

    decreaseBtn.classList.add("cart-card__quantity-control_btn")
    decreaseBtn.textContent = "-"

    quantityOfItems.classList.add("cart-card__quantity")
    quantityOfItems.textContent = quantity

    increaseBtn.classList.add("cart-card__quantity-control_btn")
    increaseBtn.textContent = "+"
    
    itemPrice.classList.add("cart-card__price")
    itemPrice.textContent = item.FinalPrice * quantity

    decreaseBtn.addEventListener("click",()=>{
        quantity --;
        quantityOfItems.textContent = quantity
        itemTotalPrice = quantity * item.FinalPrice
    })

    increaseBtn.addEventListener("click",()=>{
        quantity ++;
        quantityOfItems.textContent = quantity
        itemTotalPrice = quantity * item.FinalPrice
    })

    return {li,itemTotalPrice}

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
            <button class="cart-card__quantity-control_btn">-</button>
            <p class="cart-card__quantity">qty: 1</p>
            <button class="cart-card__quantity-control_btn">+</button>
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
            let total = renderListWithTemplate(cartItemTemplate, this.listElement, list, "afterbegin", true);

            // const total = list.reduce((sum, item) => sum + item.FinalPrice, 0);
            console.log(total)
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
        updateCartCount();
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