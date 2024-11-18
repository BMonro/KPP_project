"use client";

import Header from "@/components/SimulationHeader";
import { useEffect, useState } from "react";
import Client from "@/components/Client";
import Cooker from "@/components/Cooker";
import Cashier from "@/components/Cashier";
import { sendDataToBackend } from "@/utils/sentData";


export default function Simulation() {

  const CashRegisters = [];

  for (let i = 0; i < 3; i++) {
    CashRegisters.push({
      name: `Cash Register ${i + 1}`,
      x: 1650 + i*260,
      y: 200,
      isFree: true,
    });
  }
  const Stages = [
    {
      name: "DoughStantion", 
      x: 50,
      y: 300,      
      isFree: true      
    },
    {
      name: "CookingStantion",
     // x: 425,
      //y: 300,
      x: 925,
      y: 685,  
      isFree: true
    },
    {
      name: "BakingStantion",
      x: 700,
      y: 300,  
      isFree: true
    },
    {
      name: "BakingStantion2",
      x: 900,
      y: 300,  
      isFree: true
    },
    {
      name: "SlicingStation",
      x: 950,
      y: 700,
      isFree: true
    }
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orders, setOrders] = useState([
    { id: 12, item: "Pizza Carbonara", status: "Готова" },
    { id: 13, item: "Pizza Pepperoni", status: "Готується" },
    { id: 14, item: "Pasta Bolognese", status: "Готова" },
    { id: 15, item: "Salad Caesar", status: "Готується" }
  ]);

  //Надсилання даних на бек
  const data = {};
  for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);
      data[key] = value;
      console.log(`${key}: ${value}`);
  }
  sendDataToBackend(data);


  // Стани для даних з localStorage
  const [cooks, setCooks] = useState(1);
  const [cashRegisters, setCashRegisters] = useState(1);
  const [kitchenMode, setKitchenMode] = useState("1 cook - 1 option");
  const ClientsNum = 10;
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
      const cookers = [];
      for (let i = 0; i < cooks; i++) {
        const newCooker = new Cooker(container, `Chef ${i + 1}`, 0 + i * 75, 600);
        cookers.push(newCooker);
      }
  
      // Виклик moveTo для першого кухаря до DoughStation
      if (cookers.length > 0) {
        setTimeout(() => {
          moveTo(cookers[1], "SlicingStation", Stages); // Передаємо Stages як аргумент
        }, 1000); // Затримка для анімації
        setTimeout(() => {
          moveTo(cookers[1], "BakingStantion2", Stages); // Передаємо Stages як аргумент
        }, 4000); // Затримка для анімації
      }
  
      // Створюємо касири відповідно до збережених даних
      for (let j = 0; j < cashRegisters; j++) {
        new Cashier(container, `Cashier ${j + 1}`, 1650 + j * 260, 50);
      }
      // Створюємо клієнтів
      const clients = [];
      for (let j = 0; j < ClientsNum; j++) {
        const newClient = new Client(
          container,
          `Client ${j + 1}`,
          "Pizza Carbonara",
          "Готується",
          1500 + j * 75,
          850
        );
        clients.push(newClient);
      }

      setTimeout(() => {
        moveToCashRegister(clients[1], 1);
      }, 4000);

    }
  }, [cooks, cashRegisters, kitchenMode]);
  
  const handleTableClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  function moveTo(cooker, stationName, stages) {
    // Знаходимо потрібну станцію за назвою
    const station = stages.find((stage) => stage.name === stationName);
  
    // Якщо станція не знайдена або вона зайнята, виходимо
    if (!station || !station.isFree) {
      console.log(`${stationName} is currently occupied or does not exist.`);
      return;
    }
  
    // Робимо станцію зайнятою
    station.isFree = false;
  
    console.log(`Moving ${cooker.name} to ${station.name}...`);
  
    // Передаємо назву станції для зміни зображення
    cooker.moveTo(station.x, station.y, station.name, () => {
      console.log(`${cooker.name} reached ${station.name}.`);
  
      // Після досягнення станції робимо її знову вільною
      station.isFree = true;
    }, stationName);
  }

  // Функція для переміщення клієнтів до кас
  function moveToCashRegister(client, cashRegisterIndex) {
    const register = CashRegisters[cashRegisterIndex];
    if (!register || !register.isFree) {
      console.log(`Cash Register ${cashRegisterIndex + 1} is currently occupied or does not exist.`);
      return;
    }

    register.isFree = false;
    client.moveTo(register.x, register.y, () => {
      console.log(`${client.name} reached ${register.name}.`);
      setTimeout(() => {
        register.isFree = true;
        console.log(`${register.name} is now free.`);
      }, 3000);
    });
  }
  

  
  return (
    <div className="h-screen overflow-hidden">
      <Header />
      <div className="simulation-background" id="cooker-container">
        {/* Зображення столу */}
        <img
          src="/simulation/images/newTables.png"
          alt="Table"
          className="table-image"
          onClick={handleTableClick}
          style={{ cursor: "pointer" }}
        />
        <img src="/simulation/images/casaNew.png" alt="Casa" className="casa-image" />
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

