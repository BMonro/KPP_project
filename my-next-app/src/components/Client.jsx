// Клас Client
export default class Client {
  constructor(container, name, order, cashierID, info, x, y, orderId, clientOrder) {
    this.container = container;
    this.name = name;
    this.order = order;
    this.cashierID = cashierID;
    this.info = info;
    this.imageSrc = "/simulation/images/client.png";
    this.x = x;
    this.y = y;
    this.orderId = orderId;
    this.clientDiv = null; // Зберігаємо посилання на створений елемент
    this.createClient();
    this.clientOrder = clientOrder
  }

  // Створення клієнта
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
      Order: ${this.order}<br>
    `;

    clientDiv.appendChild(clientImage);
    clientDiv.appendChild(tooltip);
    this.container.appendChild(clientDiv);

    // Обробка подій для підказки
    clientDiv.addEventListener("mouseenter", () => {
      tooltip.style.display = "block";
    });

    clientDiv.addEventListener("mouseleave", () => {
      tooltip.style.display = "none";
    });

    // Зберігаємо посилання на елемент для майбутнього використання
    this.clientDiv = clientDiv;
  }

  // Оновлення позиції клієнта на екрані
  updatePosition() {
    if (this.clientDiv) {
      this.clientDiv.style.left = `${this.x}px`;
      this.clientDiv.style.top = `${this.y}px`;
    }
  }

  // Переміщуємо клієнта до нових координат з анімацією
  moveTo(newX, newY, callback) {
    // Перевірка, чи елемент існує
    if (!this.clientDiv) return;

    // Додаємо анімацію для left і top
    this.clientDiv.style.transition = "left 1s ease-in-out, top 1s ease-in-out";

    // Оновлюємо глобальні координати клієнта
    this.x = newX;
    this.y = newY;

    // Оновлюємо позицію на екрані
    this.updatePosition();

    // Виконуємо callback після завершення анімації
    setTimeout(() => {
      if (callback) callback();
    }, 1000);
  }
}
