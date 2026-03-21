export default class Alert {
  async init() {
    const response = await fetch("/json/alerts.json");
    const alerts = await response.json();

    if (!alerts.length) return;

    const section = document.createElement("section");
    section.className = "alert-list";

    alerts.forEach(({ message, background, color }) => {
      const p = document.createElement("p");
      p.textContent = message;
      p.style.background = background;
      p.style.color = color;
      p.style.textAlign = "center";
      section.appendChild(p);
    });

    document.querySelector("main").prepend(section);
  }
}
