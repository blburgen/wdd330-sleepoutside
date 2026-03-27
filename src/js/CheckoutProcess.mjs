import { getLocalStorage, setLocalStorage, alertMessage } from './utils.mjs';

export default class CheckoutProcess {
  constructor(formSelector, externalServices) {
    this.form = document.querySelector(formSelector);
    this.externalServices = externalServices;
  }

  getFormValues() {
    return {
      fname: this.form.querySelector('[name="fname"]').value,
      lname: this.form.querySelector('[name="lname"]').value,
      email: this.form.querySelector('[name="email"]').value,
      street: this.form.querySelector('[name="street"]').value,
      city: this.form.querySelector('[name="city"]').value,
      state: this.form.querySelector('[name="state"]').value,
      zip: this.form.querySelector('[name="zip"]').value,
      cardNumber: this.form.querySelector('[name="cardNumber"]').value,
      expiration: this.form.querySelector('[name="expiration"]').value,
      code: this.form.querySelector('[name="code"]').value,
    };
  }

  async checkout() {
    const formValues = this.getFormValues();
    const cartItems = getLocalStorage('so-cart') || [];

    const payload = {
      orderDate: new Date().toISOString(),
      items: cartItems,
      ...formValues,
    };

    try {
      await this.externalServices.checkout(payload);
      setLocalStorage('so-cart', []);
      window.location.href = 'success.html';
    } catch (err) {
      const msg =
        err.message && err.message.message
          ? err.message.message
          : JSON.stringify(err.message);
      alertMessage(msg);
    }
  }
}
