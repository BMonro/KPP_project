"use client";

import { useEffect, useState } from "react";
import Header from "@/components/SimulationHeader";
import Client from "@/components/Client";

import { sendDataToBackend } from "@/utils/sentData";
import { moveToCookingStation } from "@/components/movingFunctions";
import { moveToCashRegister } from "@/components/movingFunctions";
import { initializeCookersAndStations } from "@/components/cookersWork";
import { initializeCashRegisters } from "@/components/CashRegisters";
import { initializeCashiers } from "@/components/cashiersWork";

const getLocalStorageData = () => {
  const data = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    data[key] = value;
  }
  return data;
};

// Форматування замовлення для клієнта
const formatOrder = (clientOrder) => {
  return `
    ID: ${clientOrder.orderID}
    Pizzas: ${clientOrder.pizzas.map((pizza) => `"${pizza.name}"`).join(", ")}
    Drinks: ${clientOrder.drinks.map((drink) => `"${drink.name}"`).join(", ")}
  `.trim();
};


export default function Simulation() {
  // Стани для клієнтів та інших елементів
  const [clients, setClients] = useState([]);
  const [cashRegisters, setCashRegisters] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [dataSent, setDataSent] = useState(false);

  // Стани для даних з localStorage
  // const [cooks, setCooks] = useState(1);
  // const [kitchenMode, setKitchenMode] = useState("1 cook - 1 option");


  // Відправка даних на бекенд на початку запуску програми
  useEffect(() => {
    if (dataSent) return;

    const data = getLocalStorageData();
    sendDataToBackend(data);
    setDataSent(true);
  }, [dataSent]);

  
  // Ініціалізація кухарів і станцій та касирів
  useEffect(() => {
    const container = document.getElementById("cooker-container");
    const casaElement = document.querySelector(".casa-image");
    const tableElement = document.querySelector(".table-image");

    if (container && casaElement && tableElement) {
      console.log("initial")
      casaElement.onload = () => initializeCashRegisters(casaElement, setCashRegisters);
      tableElement.onload = () => initializeCookersAndStations(tableElement, container);
      casaElement.onload = () => initializeCashiers(casaElement, container, setCashRegisters);
    }
  }, []);

  // Обробка WebSocket з бекенду для отримання даних
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080/ws");
  
    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        const { order: clientOrder, idCashier } = data;
        console.log("data");
        console.log(data);

        const cashierID = idCashier || "1";
        const casaElement = document.querySelector(".casa-image");
        if (!casaElement) {
          console.error("Casa element not found.");
          return;
        }
        if (clients.length >= 27) {
          console.log("Максимальна кількість клієнтів досягнута.");
          return;
        }
        const casaRect = casaElement.getBoundingClientRect();
        const casaX = casaRect.left;
        const casaY = casaRect.top;
        const casaWidth = casaRect.width;
        const casaHeight = casaRect.height;
    
        const index = clients.length; 
        const clientX = casaX + casaWidth * 0.1 + (index % 9) * casaWidth * 0.1;
        const clientY = casaY + casaHeight * 0.4 + Math.floor(index / 9) * casaHeight * 0.1;

        // Створення нового клієнта
        const newClient = new Client(
          document.getElementById("cooker-container"),
          `Client ${clients.length + 1}`,
          formatOrder(clientOrder), 
          cashierID,
          clientX, // координати для нового клієнта
          clientY
        );
        
        // Оновлення стану клієнтів, додаючи нового клієнта в масив
        setClients(prevClients => [...prevClients, newClient]);
  
        // Переміщення клієнта до касового апарату
        moveToCashRegister(newClient, cashierID, setCashRegisters);
  
      } catch (error) {
        console.error("Помилка обробки повідомлення:", error);
      }
    };
  
    return () => socket.close();
  }, [clients]);

  // Відкриття модального вікна
  const handleTableClick = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="h-screen overflow-hidden">
      <Header />
      <div className="h-full overflow-x-scroll">
        <div className="simulation-background" id="cooker-container">
          <img
            src="/simulation/images/newTables.png"
            alt="Table"
            className="table-image"
            onClick={handleTableClick}
            style={{ cursor: "pointer" }}
          />
          <img src="/simulation/images/casaNew.png" alt="Casa" className="casa-image" />
        </div>
      </div>

      {/* Модальне вікно */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Список замовлень</h2>
            <div className="order-list">
              {/* Замовлення, які потрібно відображати */}

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
