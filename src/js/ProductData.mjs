const baseURL =
    import.meta.env.VITE_SERVER_URL

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
        try {
            const response = await fetch(`${baseURL}products/search/${category}`);
            const data = await convertToJson(response);
            return data.Result;
        } catch (err) {
            const res = await fetch(`/json/${category}.json`);
            const data = await res.json();
            const list = Array.isArray(data) ? data : data.Result || [];
            return list.map((item) =>
                item.Images && item.Images.PrimaryLarge ?
                item : {...item, Images: { PrimaryLarge: item.Image } }
            );
        }
    }

    async findProductById(id) {
        try {
            const response = await fetch(`${baseURL}product/${id}`);
            const data = await convertToJson(response);
            return data.Result;
        } catch (err) {
            const productModules =
                import.meta.glob("../public/json/*.json");
            for (const mod of Object.values(productModules)) {
                const data = mod.default;
                const list = Array.isArray(data) ? data : data.Result || [];
                const found = list.find((p) => p.Id === id);
                if (found) {
                    return found.Images && found.Images.PrimaryLarge ?
                        found : {...found, Images: { PrimaryLarge: found.Image } };
                }
            }
            return null;
        }
    }
}