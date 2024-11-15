export default 
// Клас Cashier
class Cashier {
  constructor(container, name, x, y) {
    this.container = container;
    this.name = name;
    this.imageSrc = "/simulation/images/Cashier.png";
    this.x = x;
    this.y = y;
    this.createCashier();
  }

  createCashier() {
    const cashierDiv = document.createElement("div");
    cashierDiv.classList.add("cashier");
    cashierDiv.style.position = "absolute";
    cashierDiv.style.left = `${this.x}px`;
    cashierDiv.style.top = `${this.y}px`;

    const cashierImage = document.createElement("img");
    cashierImage.src = this.imageSrc;
    cashierImage.alt = this.name;
    cashierImage.classList.add("cashier-image");

    const tooltip = document.createElement("div");
    tooltip.classList.add("tooltip");
    tooltip.textContent = this.name;

    cashierDiv.appendChild(cashierImage);
    cashierDiv.appendChild(tooltip);
    this.container.appendChild(cashierDiv);

    cashierDiv.addEventListener("mouseenter", () => {
      tooltip.style.display = "block";
    });

    cashierDiv.addEventListener("mouseleave", () => {
      tooltip.style.display = "none";
    });
  }
}
