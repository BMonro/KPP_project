
// Клас Client
export default class Client {
    constructor(container, name, order, status, x, y) {
      this.container = container;
      this.name = name;
      this.order = order;
      this.status = status;
      this.imageSrc = "/simulation/images/client.png";
      this.x = x;
      this.y = y;
      this.createClient();
    }
  
    createClient() {
      const clientDiv = document.createElement("div");
      clientDiv.classList.add("client");
      clientDiv.style.position = "absolute";
      clientDiv.style.left = `${this.x}px`;
      clientDiv.style.top = `${this.y}px`;
  
      const clientImage = document.createElement("img");
      clientImage.src = this.imageSrc;
      clientImage.alt = this.name;
      clientImage.classList.add("client-image");
  
      const tooltip = document.createElement("div");
      tooltip.classList.add("tooltip");
      tooltip.innerHTML = `
        <strong>${this.name}</strong><br>
        Замовлення: ${this.order}<br>
        Статус: ${this.status}
      `;
  
      clientDiv.appendChild(clientImage);
      clientDiv.appendChild(tooltip);
      this.container.appendChild(clientDiv);
  
      clientDiv.addEventListener("mouseenter", () => {
        tooltip.style.display = "block";
      });
  
      clientDiv.addEventListener("mouseleave", () => {
        tooltip.style.display = "none";
      });
    }
  }
  