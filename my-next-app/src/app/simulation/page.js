"use client";

import Header from "@/components/SimulationHeader";
import BackGround from "@/components/SimulationBackground";
import { useEffect, useState } from "react";
import { sendDataToBackend } from "@/utils/sentData";

// Клас Cooker
class Cooker {
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
    tooltip.textContent = `${this.name}: ${this.description}`;

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

export default function Simulation() {
    // Отримуємо всі дані з localStorage
    const data = {};
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        data[key] = value;
        console.log(`${key}: ${value}`);
    }
    sendDataToBackend(data);

    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        // Додаємо кухаря за замовчуванням при завантаженні сторінки
        const container = document.getElementById('cooker-container');
        if (container) {
            new Cooker(
                container,
                "Chef Mario",
                "Master of Italian Cuisine",
                "/simulation/images/cooker.png",
                500, // координата X
                300  // координата Y
            );
        }
    }, []);

    function handleStart() {
        setIsRunning(true);
    }

    function handleStop() {
        setIsRunning(false);
    }

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
