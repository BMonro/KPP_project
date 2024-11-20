"use client";

import { useEffect, useState } from "react";
import Header from "@/components/SimulationHeader";
import Client from "@/components/Client";
import Cooker from "@/components/Cooker";
import Cashier from "@/components/Cashier";
import { sendDataToBackend } from "@/utils/sentData";
import { moveToCookingStation } from "@/components/movingFunctions";
import { moveToCashRegister } from "@/components/movingFunctions";

export default function Simulation() {
  // Стани для клієнтів та інших елементів
  const [clients, setClients] = useState([]);
  const [cashRegisters, setCashRegisters] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [dataSent, setDataSent] = useState(false);

  // Стани для даних з localStorage
  const [cooks, setCooks] = useState(1);
  const [kitchenMode, setKitchenMode] = useState("1 cook - 1 option");

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

  // Форматування замовлення для клієнта
  const formatOrder = (clientOrder) => {
    return `
      ID: ${clientOrder.orderID}
      Pizzas: ${clientOrder.pizzas.map((pizza) => `"${pizza.name}"`).join(", ")}
      Drinks: ${clientOrder.drinks.map((drink) => `"${drink.name}"`).join(", ")}
    `.trim();
  };

  // Відправка даних на бекенд
  useEffect(() => {
    if (dataSent) return;

    const data = getLocalStorageData();
    sendDataToBackend(data);
    setDataSent(true);
  }, [dataSent]);

  const getLocalStorageData = () => {
    const data = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);
      data[key] = value;
    }
    return data;
  };


  // Зчитування даних з localStorage
  useEffect(() => {
    const savedCooks = localStorage.getItem("choosedCooks");
    const savedCashRegisters = localStorage.getItem("choosedCashRegisters");
    const savedKitchenMode = localStorage.getItem("choosedKitchenMode");

    if (savedCooks) setCooks(JSON.parse(savedCooks));
    if (savedCashRegisters) setCashRegisters(JSON.parse(savedCashRegisters));
    if (savedKitchenMode) setKitchenMode(JSON.parse(savedKitchenMode));
  }, []);

  // Ініціалізація касових реєстрів і кухарів
  useEffect(() => {
    const casaElement = document.querySelector(".casa-image");

    if (casaElement && casaElement.complete) {
      initializeCashRegisters(casaElement);
    } else {
      casaElement.onload = () => initializeCashRegisters(casaElement);
    }

    // Функція для ініціалізації касових реєстрів
    function initializeCashRegisters(casaElement) {
      const casaRect = casaElement.getBoundingClientRect();
      const { left: casaX, top: casaY, width: casaWidth, height: casaHeight } = casaRect;

      const newRegisters = Array.from({ length: 3 }, (_, i) => ({
        name: `Cash Register ${i + 1}`,
        x: casaX + casaWidth * 0.25 + i * casaWidth * 0.25,
        y: casaY - casaHeight * 0.4,
        isFree: true,
      }));

      setCashRegisters(newRegisters);
    }
  }, []);

  // Ініціалізація кухарів і станцій
  useEffect(() => {
    const container = document.getElementById("cooker-container");
    const casaElement = document.querySelector(".casa-image");
    const tableElement = document.querySelector(".table-image");

    if (container && casaElement && tableElement) {
      tableElement.onload = () => initializeCookersAndStations(tableElement, container);
      casaElement.onload = () => initializeCashiers(casaElement, container);
    }
  }, [cooks, kitchenMode]);

  // Ініціалізація кухарів та станцій
  const initializeCookersAndStations = (tableElement, container) => {
    const tableRect = tableElement.getBoundingClientRect();
    const { left: tableX, top: tableY, width: tableWidth, height: tableHeight } = tableRect;
    const sliceTable = tableWidth / 4;

    const Stages = [
      { name: "DoughStation", x: tableX + tableWidth * 0.1, y: tableY + tableHeight * 0.05, isFree: true },
      { name: "CookingStation", x: tableX + sliceTable, y: tableY + tableHeight * 0.05, isFree: true },
      { name: "BakingStation", x: tableX + sliceTable * 2, y: tableY + tableHeight * 0.05, isFree: true },
      { name: "SlicingStation", x: tableX + sliceTable * 3, y: tableY + tableHeight / 3, isFree: true },
    ];

    const cookers = Array.from({ length: 3 }, (_, i) => {
      const cookerX = tableX + i * tableWidth * 0.09;
      const cookerY = tableY + tableHeight * 0.3;
      return new Cooker(container, `Chef ${i + 1}`, cookerX, cookerY);
    });

    // Анімація для кухарів
    if (cookers.length > 0) {
      setTimeout(() => moveToCookingStation(cookers[1], "SlicingStation", Stages), 1000);
      setTimeout(() => moveToCookingStation(cookers[1], "BakingStation", Stages), 4000);
    }
  };

  // Ініціалізація касирів
  const initializeCashiers = (casaElement, container) => {
    const casaRect = casaElement.getBoundingClientRect();
    const { left: casaX, top: casaY, width: casaWidth, height: casaHeight } = casaRect;

    const cashiers = Array.from({ length: 3 }, (_, i) => {
      const cashierX = casaX + casaWidth * 0.25 + i * casaWidth * 0.25;
      const cashierY = casaY - casaHeight * 0.4;
      return new Cashier(container, `Cashier ${i + 1}`, cashierX, cashierY);
    });

    // Оновлення стейту касирів
    setCashRegisters(cashiers);
  };

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
