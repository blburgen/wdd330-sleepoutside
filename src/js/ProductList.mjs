import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(item) {
  let hasDiscount = false;
  let discountAmount = 0;
  if (item.FinalPrice < item.SuggestedRetailPrice) {
    hasDiscount = true;
    discountAmount = Math.round(
      (item.FinalPrice / item.SuggestedRetailPrice) * 100 - 100,
    );
  }
  console.log(item);
  const newItem = `
        <li class="product-card">
            <a href="/product_pages/?product=${item.Id}">
                <img
                src=${item.Images.PrimaryLarge}
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

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const list = await this.dataSource.getData(this.category);
    this.renderList(list);
    document.querySelector(".title").textContent = this.category;
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}
