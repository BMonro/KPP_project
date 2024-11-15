"use client";

import Header from "@/components/SimulationHeader";
import { useEffect, useState } from "react";
import { sendDataToBackend } from "@/utils/sentData";



export default function Simulation() {
    

    useEffect(() => {
        // Додаємо кухаря за замовчуванням при завантаженні сторінки
        const container = document.getElementById('cooker-container');
        if (container) {
          new Cooker(container, "Chef Nazar", 200, 300); // Перший кухар "Chef Mario"
          new Cooker(container, "Super Chef Roman",  200, 620); // Другий кухар "Chef Luigi"
          new Cooker(container, "Chef Stas", 200, 700); // Третій кухар "Chef Anna"
          new Cooker(container, "Chef Sophia", 200, 940); // Четвертий кухар "Chef Sophia"
          new Cashier(container, "Cashier Vlad", 775, 475); // Перший касир
          new Cashier(container, "Cashier Marta", 775, 675); // Другий касир
          new Cashier(container, "Cashier Andriy", 775, 900); // Третій касир
           // Додаємо клієнтів
          new Client(container, "Oleksiy", "Pizza Carbonara", "Готується", 950, 475); 
          new Client(container, "Maria", "Pizza Pepperoni", "Готова", 950, 675); 
          new Client(container, "Ivan", "Pasta Bolognese", "Готується", 950, 900);
      }
    }, []);


    return (
        <div className="h-screen overflow-hidden">
            <Header />
            <div className="simulation-background" id="cooker-container">
                <img src="/simulation/images/tables.png" alt="Table" className="table-image" />
                <img src="/simulation/images/casa.png" alt="Casa" className="casa-image" />
                <img src="/simulation/images/door.png" alt="Door" className="door-image" />
            </div>
        </div>
    );
}

// Клас Cooker
class Cooker {
  constructor(container, name, x, y) {
    this.container = container;
    this.name = name;
    this.imageSrc = "/simulation/images/Cooker.png";
    this.x = x;
    this.y = y;
    this.createCooker();
  }

  createCooker() {
    // Створення елемента для кухаря
    const cookerDiv = document.createElement('div');
    cookerDiv.classList.add('cooker');
    cookerDiv.style.position = 'absolute';
    cookerDiv.style.left = `${this.x}px`;
    cookerDiv.style.top = `${this.y}px`;

    // Додавання зображення кухаря
    const cookerImage = document.createElement('img');
    cookerImage.src = this.imageSrc;
    cookerImage.alt = this.name;
    cookerImage.classList.add('cooker-image');

    // Додавання підказки
    const tooltip = document.createElement('div');
    tooltip.classList.add('tooltip');
    tooltip.textContent = `${this.name}`;

    // Додавання елементів в контейнер
    cookerDiv.appendChild(cookerImage);
    cookerDiv.appendChild(tooltip);
    this.container.appendChild(cookerDiv);

    // Додавання ефекту при наведенні
    cookerDiv.addEventListener('mouseenter', () => {
      tooltip.style.display = 'block';
    });

    cookerDiv.addEventListener('mouseleave', () => {
      tooltip.style.display = 'none';
    });
  }
}
// Клас Cooker
class Cashier {
  constructor(container, name, x, y) {
    this.container = container;
    this.name = name;
    this.imageSrc = "/simulation/images/Cashier.png"; // Шлях до зображення касира
    this.x = x;
    this.y = y;
    this.createCashier();
  }

  createCashier() {
    // Створення елемента для касира
    const cashierDiv = document.createElement('div');
    cashierDiv.classList.add('cashier'); // Додаємо клас 'cashier'
    cashierDiv.style.position = 'absolute';
    cashierDiv.style.left = `${this.x}px`;
    cashierDiv.style.top = `${this.y}px`;

    // Додавання зображення касира
    const cashierImage = document.createElement('img');
    cashierImage.src = this.imageSrc;
    cashierImage.alt = this.name;
    cashierImage.classList.add('cashier-image'); // Додаємо клас для зображення

    // Додавання підказки
    const tooltip = document.createElement('div');
    tooltip.classList.add('tooltip');
    tooltip.textContent = `${this.name}`; // Виведення імені касира

    // Додавання елементів в контейнер
    cashierDiv.appendChild(cashierImage);
    cashierDiv.appendChild(tooltip);
    this.container.appendChild(cashierDiv);

    // Додавання ефекту при наведенні
    cashierDiv.addEventListener('mouseenter', () => {
      tooltip.style.display = 'block'; // Показати підказку
    });

    cashierDiv.addEventListener('mouseleave', () => {
      tooltip.style.display = 'none'; // Приховати підказку
    });
  }
}
class Client {
  constructor(container, name, order, status, x, y) {
    this.container = container;
    this.name = name;
    this.order = order;
    this.status = status;
    this.imageSrc = "/simulation/images/client.png"; // Зображення для клієнта
    this.x = x;
    this.y = y;
    this.createClient();
  }

  createClient() {
    // Створення елемента для клієнта
    const clientDiv = document.createElement('div');
    clientDiv.classList.add('client');
    clientDiv.style.position = 'absolute';
    clientDiv.style.left = `${this.x}px`;
    clientDiv.style.top = `${this.y}px`;

    // Додавання зображення клієнта
    const clientImage = document.createElement('img');
    clientImage.src = this.imageSrc;
    clientImage.alt = this.name;
    clientImage.classList.add('client-image');

    // Додавання підказки з інформацією про замовлення
    const tooltip = document.createElement('div');
    tooltip.classList.add('tooltip');
    tooltip.innerHTML = `
      <strong>${this.name}</strong><br>
      Замовлення: ${this.order}<br>
      Статус: ${this.status}
    `;

    // Додавання елементів в контейнер
    clientDiv.appendChild(clientImage);
    clientDiv.appendChild(tooltip);
    this.container.appendChild(clientDiv);

    // Додавання ефекту при наведенні
    clientDiv.addEventListener('mouseenter', () => {
      tooltip.style.display = 'block';
    });

    clientDiv.addEventListener('mouseleave', () => {
      tooltip.style.display = 'none';
    });
  }
}
