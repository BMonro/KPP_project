"use client";

import Header from "@/components/SimulationHeader";
import { useEffect, useState } from "react";
import Client from "@/components/Client";
import Cooker from "@/components/Cooker";
import Cashier from "@/components/Cashier";


export default function Simulation() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orders, setOrders] = useState([
    { id: 12, item: "Pizza Carbonara", status: "Готова" },
    { id: 13, item: "Pizza Pepperoni", status: "Готується" },
    { id: 14, item: "Pasta Bolognese", status: "Готова" },
    { id: 15, item: "Salad Caesar", status: "Готується" }
  ]);

  // Стани для даних з localStorage
  const [cooks, setCooks] = useState(1);
  const [cashRegisters, setCashRegisters] = useState(1);
  const [kitchenMode, setKitchenMode] = useState("1 cook - 1 option");

  // Витягуємо дані з localStorage при завантаженні компонента
  useEffect(() => {
    const savedCooks = localStorage.getItem("choosedCooks");
    const savedCashRegisters = localStorage.getItem("choosedCashRegisters");
    const savedKitchenMode = localStorage.getItem("choosedKitchenMode");

    if (savedCooks) setCooks(JSON.parse(savedCooks));
    if (savedCashRegisters) setCashRegisters(JSON.parse(savedCashRegisters));
    if (savedKitchenMode) setKitchenMode(JSON.parse(savedKitchenMode));
  }, []);

  useEffect(() => {
    const container = document.getElementById("cooker-container");
    if (container) {
      // Створюємо кухарів відповідно до збережених даних
      for (let i = 0; i < cooks; i++) {
        new Cooker(container, `Chef ${i + 1}`, 200, 300 + i * 100);
      }

      // Створюємо касири відповідно до збережених даних
      for (let j = 0; j < cashRegisters; j++) {
        new Cashier(container, `Cashier ${j + 1}`, 775, 475 + j * 265);
      }

      // Додаємо клієнтів
      new Client(container, "Oleksiy", "Pizza Carbonara", "Готується", 950, 455);
      new Client(container, "Maria", "Pizza Pepperoni", "Готова", 950, 725);
      new Client(container, "Ivan", "Pasta Bolognese", "Готується", 950, 980);
    }
  }, [cooks, cashRegisters, kitchenMode]);

  const handleTableClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="h-screen overflow-hidden">
      <Header />
      <div className="simulation-background" id="cooker-container">
        {/* Зображення столу */}
        <img
          src="/simulation/images/tables.png"
          alt="Table"
          className="table-image"
          onClick={handleTableClick}
          style={{ cursor: "pointer" }}
        />
        <img src="/simulation/images/casa.png" alt="Casa" className="casa-image" />
        <img src="/simulation/images/door.png" alt="Door" className="door-image" />
      </div>

      {/* Модальне вікно */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Список замовлень</h2>
            <div className="order-list">
              {orders.map((order) => (
                <div key={order.id} className="order-item">
                  <span className="order-id">№{order.id}</span>
                  <span className="order-item-name">{order.item}</span>
                  <span className="order-status">{order.status}</span>
                </div>
              ))}
            </div>
            <button onClick={closeModal} className="close-button">
              Закрити
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

