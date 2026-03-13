
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

const dataSource = new ProductData("tents");
const productListing = document.querySelector(".product-list");

const myList = new ProductList("tents", dataSource, productListing);

myList.init();

/*
async function renderCartContents() {
  let tentData = await getTentData();
  const htmlItems = tentData.map((item) =>
    item.ProductPageUrl ? cartItemTemplate(item) : null,
  );
  productListing.innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  let hasDiscount = false;
  let discountAmount = 0;
  if (item.FinalPrice < item.SuggestedRetailPrice) {
    hasDiscount = true;
    discountAmount = Math.round(
      (item.FinalPrice / item.SuggestedRetailPrice) * 100 - 100,
    );
  }
  const newItem = `
        <li class="product-card">
            <a href="product_pages/?product=${item.Id}">
                <img
                src=${item.Image}
                alt=${item.Name}
              />
                <h3 class="card__brand">${item.Name}</h3>
                <h2 class="card__name">${item.NameWithoutBrand}</h2>
                <div class="container_price">
                  <p class="product-card__price">$${item.FinalPrice}</p>
                  ${hasDiscount ? `<p class="discount__price">${discountAmount}% off</p>` : ""}
                </div>
            </a>
        </li>`;

  return newItem;
}

renderCartContents();
*/
