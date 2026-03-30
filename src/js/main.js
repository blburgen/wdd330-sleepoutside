import { loadHeaderFooter } from "./utils.mjs";
import Alert from "./Alert.js";

loadHeaderFooter();

const alert = new Alert();
alert.init();

const newsletterForm = document.getElementById("newsletter-form");
const newsletterMessage = document.getElementById("newsletter-message");

if (newsletterForm != null) {
  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = newsletterForm.email.value.trim();
    newsletterMessage.textContent = `Thanks! ${email} has been signed up for our newsletter.`;
    newsletterMessage.hidden = false;
    newsletterForm.reset();
  });
}
