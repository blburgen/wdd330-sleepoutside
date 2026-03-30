const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor() {}

  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  async getAllData(searchItem) {
    console.log(searchItem);
    const allCategories = ["tents", "hammocks", "backpacks", "sleeping-bags"];
    const allDataNested = await Promise.all(
      allCategories.map(async (category) => {
        const response = await fetch(`${baseURL}products/search/${category}`);
        const data = await convertToJson(response);
        return data.Result == null ? [] : data.Result;
      }),
    );

    let allDataClean = allDataNested.flat();
    let filteredData = allDataClean.filter(
      (item) =>
        item.Name.includes(searchItem) ||
        item.DescriptionHtmlSimple.includes(searchItem),
    );
    return filteredData;
  }

  async findProductById(id) {
    try {
      const response = await fetch(`${baseURL}product/${id}`);
      const data = await convertToJson(response);
      return data.Result;
    } catch (err) {
      const productModules = import.meta.glob("../public/json/*.json", {
        eager: true,
      });
      for (const mod of Object.values(productModules)) {
        const data = mod.default;
        const list = Array.isArray(data) ? data : data.Result || [];
        const found = list.find(
          (p) => p.Id === id || String(p.Id) === String(id),
        );
        if (found) {
          return found.Images && found.Images.PrimaryLarge
            ? found
            : { ...found, Images: { PrimaryLarge: found.Image } };
        }
      }
      return null;
    }
  }
}
