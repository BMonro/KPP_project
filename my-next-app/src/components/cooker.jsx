export default class Cooker {
  constructor(container, name, x, y) {
    this.container = container;
    this.name = name;
    this.imageSrc = "/simulation/images/Cooker.png";
    this.x = x;
    this.y = y;
    this.selectedOrder = {
      orderId: null,
      status: null,
      nameOfPizza: null
    }
    this.isFree = true;
    this.status = null;
    this.createCooker();
  }

  createCooker() {
    // Створюємо елемент кухаря
    this.element = document.createElement("div");
    this.element.classList.add("cooker");
    this.element.style.position = "absolute";
    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;

    const cookerImage = document.createElement("img");
    cookerImage.src = this.imageSrc;
    cookerImage.alt = this.name;
    cookerImage.classList.add("cooker-image");

    const tooltip = document.createElement("div");
    tooltip.classList.add("tooltip");
    tooltip.textContent = this.name;

    this.element.appendChild(cookerImage);
    this.element.appendChild(tooltip);
    this.container.appendChild(this.element);

    // Tooltip visibility on hover
    this.element.addEventListener("mouseenter", () => {
      tooltip.style.display = "block";
    });

    this.element.addEventListener("mouseleave", () => {
      tooltip.style.display = "none";
    });
  }

  updatePosition() {
    if (this.element) {
      this.element.style.left = `${this.x}px`;
      this.element.style.top = `${this.y}px`;
    }
  }

  // Переміщуємо кухаря до абсолютних координат
  moveTo(newX, newY, stationName, callback) {
    // Зміна зображення
    const cookerImage = this.element.querySelector(".cooker-image");
    if (stationName === "SlicingStation") {
      cookerImage.src = "/simulation/images/CookerInversed.png"; // Зображення для SlicingStation
    } else {
      cookerImage.src = "/simulation/images/Cooker.png"; // Дефолтне зображення
    }

    // Додаємо анімацію для left і top
    this.element.style.transition = "left 1s ease-in-out, top 1s ease-in-out";

    // Оновлюємо глобальні координати кухаря
    this.x = newX;
    this.y = newY;

    // Застосовуємо нові координати
    this.updatePosition();

    // Виконуємо callback після завершення анімації
    setTimeout(() => {
      if (callback);
    }, 1000);
  }
}