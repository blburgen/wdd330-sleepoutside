const baseURL = import.meta.env.VITE_SERVER_URL;

async function convertToJson(res) {
  const jsonResponse = await res.json();
  if (res.ok) return jsonResponse;
  throw { name: 'servicesError', message: jsonResponse };
}

export default class ExternalServices {
  async checkout(payload) {
    const res = await fetch(`${baseURL}checkout/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return convertToJson(res);
  }
}
