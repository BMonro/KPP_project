export default 
// Клас Cashier
class Cashier {
  constructor(container, name, index, isFree, x, y) {
    this.container = container;
    this.name = name;
    this.index = index;
    this.imageSrc = "/simulation/images/Cashier.png";
    this.isFree = isFree;
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
