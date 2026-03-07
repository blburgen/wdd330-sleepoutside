import { getTentData } from "./utils.mjs";

const productListing = document.querySelector(".product-list");

async function renderCartContents() {
  let tentData = await getTentData();
  const htmlItems = tentData.map((item) =>
    item.ProductPageUrl ? cartItemTemplate(item) : null,
  );
  productListing.innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  const newItem = `
        <li class="product-card">
            <a href=${item.ProductPageUrl}>
                <img
                src=${item.Image}
                alt=${item.Name}
              />
                <h3 class="card__brand">${item.Name}</h3>
                <h2 class="card__name">${item.NameWithoutBrand}</h2>
                <p class="product-card__price">${item.FinalPrice}</p>
            </a>
        </li>`;

  return newItem;
}

renderCartContents();
