"use client";

import Header from "@/components/SimulationHeader";
import { useEffect, useState } from "react";
import Client from "@/components/Client";
import Cooker from "@/components/Cooker";
import Cashier from "@/components/Cashier";
import { sendDataToBackend } from "@/utils/sentData";

const data = {};
for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    data[key] = value;
    console.log(`${key}: ${value}`);
}
sendDataToBackend(data);

export default function Simulation() {
  const [CashRegisters, setCCashRegisters] = useState([]);

  
 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orders, setOrders] = useState([
    { id: 12, item: "Pizza Carbonara", status: "Готова" },
    { id: 13, item: "Pizza Pepperoni", status: "Готується" },
    { id: 14, item: "Pasta Bolognese", status: "Готова" },
    { id: 15, item: "Salad Caesar", status: "Готується" }
  ]);

  //Надсилання даних на бек


  useEffect(() => {
    const savedCooks = localStorage.getItem("choosedCooks");
    const savedCashRegisters = localStorage.getItem("choosedCashRegisters");
    const savedKitchenMode = localStorage.getItem("choosedKitchenMode");

    if (savedCooks) setCooks(JSON.parse(savedCooks));
    if (savedCashRegisters) setCashRegisters(JSON.parse(savedCashRegisters));
    if (savedKitchenMode) setKitchenMode(JSON.parse(savedKitchenMode));
  }, []);

  
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
    const casaElement = document.querySelector(".casa-image");
    if (casaElement && casaElement.complete) {
      initializeCashRegisters();
    } else {
      casaElement.onload = initializeCashRegisters;
    }
  
    function initializeCashRegisters() {
      const casaRect = casaElement.getBoundingClientRect();
      const casaX = casaRect.left;
      const casaY = casaRect.top;
      const casaWidth = casaRect.width;
      const casaHeight = casaRect.height;
  
      const newRegisters = [];
      for (let i = 0; i < 3; i++) {
        const clientX = casaX + casaWidth * 0.25 + i * casaWidth * 0.25; 
        const clientY = casaY - casaHeight * 0.4;
        newRegisters.push({
          name: `Cash Register ${i + 1}`,
          x: clientX,
          y: clientY,
          isFree: true,
        });
      }
      setCCashRegisters(newRegisters);
    }
  }, []);

 

  useEffect(() => {
    const container = document.getElementById("cooker-container");
    const casaElement = document.querySelector(".casa-image"); // Знаходимо елемент Casa
    const tableElement = document.querySelector(".table-image"); // Знаходимо елемент Casa


    
    
    if (container) {
      tableElement.onload = () => {
        const tableRect = tableElement.getBoundingClientRect();
        const tableX = tableRect.left; // Ліва координата
        const tableY = tableRect.top;  // Верхня координата
        const tableWidth = tableRect.width; // Ширина
        const tableHeight = tableRect.height; // Висота 
        const sliceTable = tableWidth / 4;

        console.log(tableX);

        const Stages = [
          {
            name: "DoughStantion", 
            x: tableX + tableWidth * 0.1,
            y: tableY + tableHeight * 0.05,      
            isFree: true      
          },
          {
            name: "CookingStantion",
           // x: 425,
            //y: 300,
            x: tableX + sliceTable,
            y: tableY + tableHeight * 0.05,    
            isFree: true
          },
          {
            name: "BakingStantion",
            x: tableX + sliceTable * 2,
            y: tableY + tableHeight * 0.05,   
            isFree: true
          },
          {
            name: "BakingStantion2",
            x: tableX + sliceTable * 3,
            y: tableY + tableHeight * 0.05,   
            isFree: true
          },
          {
            name: "SlicingStation",
            x: tableX + sliceTable * 3,
            y: tableY + tableHeight / 3,  
            isFree: true
          }
        ];

        const cookers = [];
        for (let i = 0; i < 3; i++) {
          const cookerX = tableX +  i * tableWidth * 0.25;
          const cookerY = tableY ;    
          const newCooker = new Cooker(container, `Chef ${i + 1}`, cookerX, cookerY);
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
      }

      casaElement.onload = () => {
        const casaRect = casaElement.getBoundingClientRect();
        const casaX = casaRect.left; // Ліва координата
        const casaY = casaRect.top;  // Верхня координата
        const casaWidth = casaRect.width; // Ширина
        const casaHeight = casaRect.height; // Висота

        for (let j = 0; j < 3; j++) {
          const clientX = casaX + casaWidth * 0.25 + j * casaWidth * 0.25; // Розподіляємо по ширині Casa
          const clientY = casaY - casaHeight * 0.4;    // Клієнти розташовуються рядами
            new Cashier(container, `Cashier ${j + 1}`, clientX, clientY);
        }

        const clients = [];
        for (let j = 0; j < ClientsNum; j++) {
          // Розраховуємо координати для кожного клієнта на основі Casa
          const clientX = casaX + casaWidth * 0.1  + (j % 5) * (casaWidth / 5); // Розподіляємо по ширині Casa
          const clientY = casaY + casaHeight * 0.5 + Math.floor(j / 5) * 50;    // Клієнти розташовуються рядами

          const newClient = new Client(
            container,
            `Client ${j + 1}`,
            "Pizza Carbonara",
            "Готується",
            clientX,
            clientY
          );
          clients.push(newClient);
        }
        setTimeout(() => {
          moveToCashRegister(clients[1], 1);
        }, 4000);
  }

      

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
      // console.log(`${cooker.name} reached ${station.name}.`);
  
      // Після досягнення станції робимо її знову вільною
      station.isFree = true;
    }, stationName);
  }

  function moveToCashRegister(client, cashRegisterIndex) {
    setCCashRegisters((prevRegisters) => {
      const register = prevRegisters[cashRegisterIndex];
      if (!register || !register.isFree) {
        console.log(`Cash Register ${cashRegisterIndex + 1} is currently occupied or does not exist.`);
        return prevRegisters; // Якщо каса зайнята, нічого не змінюємо
      }
  
      const updatedRegisters = [...prevRegisters];
      updatedRegisters[cashRegisterIndex] = { ...register, isFree: false }; // Оновлюємо стан каси
  
      // Переміщуємо клієнта до каси
      client.moveTo(register.x, register.y + register.y * 0.6, () => {
        console.log(`${client.name} reached ${register.name}.`);
        setTimeout(() => {
          setCCashRegisters((prev) => {
            const resetRegisters = [...prev];
            resetRegisters[cashRegisterIndex] = { ...register, isFree: true }; // Оновлюємо касу після 3 секунд
            console.log(`${register.name} is now free.`);
            return resetRegisters;
          });
        }, 3000); // Затримка перед звільненням каси
      });
  
      return updatedRegisters;
    });
  }
  return (
    <div className="h-screen overflow-hidden">
      <Header />
      <div className=" h-full overflow-x-scroll">
        <div className="simulation-background " id="cooker-container">
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

