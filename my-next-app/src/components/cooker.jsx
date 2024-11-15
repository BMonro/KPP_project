// Cooker.js
export default class Cooker {
  constructor(container, name, description, imageSrc, x, y) {
    this.container = container;
    this.name = name;
    this.description = description;
    this.imageSrc = imageSrc;
    this.x = x;
    this.y = y;
    this.createCooker();
  }

  createCooker() {
    const cookerDiv = document.createElement('div');
    cookerDiv.classList.add('cooker');
    cookerDiv.style.position = 'absolute';
    cookerDiv.style.left = `${this.x}px`;
    cookerDiv.style.top = `${this.y}px`;

    const cookerImage = document.createElement('img');
    cookerImage.src = this.imageSrc;
    cookerImage.alt = this.name;
    cookerImage.classList.add('cooker-image');

    const tooltip = document.createElement('div');
    tooltip.classList.add('tooltip');
    tooltip.textContent = `${this.name}: ${this.description}`;

    cookerDiv.appendChild(cookerImage);
    cookerDiv.appendChild(tooltip);
    this.container.appendChild(cookerDiv);

    cookerDiv.addEventListener('mouseenter', () => {
      tooltip.style.display = 'block';
    });

    cookerDiv.addEventListener('mouseleave', () => {
      tooltip.style.display = 'none';
    });
  }
}
