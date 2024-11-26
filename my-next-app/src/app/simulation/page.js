"use client";

import { useEffect, useState, useRef } from "react";
import Header from "@/components/SimulationHeader";
import Client from "@/components/Client";

import { sendDataToBackend} from "@/utils/sentData";
import { moveToCookingStation, moveToExit } from "@/components/movingFunctions";
import { initializeCookersAndStations } from "@/components/cookersWork";
import { initializeCashRegisters } from "@/components/CashRegisters";
import { initializeCashiers } from "@/components/cashiersWork";
import useClientWebSocket from "@/hooks/useClientWebSocket";
import useMoveCookers from "@/hooks/useMoveCookers";
import { fetchOrders } from "@/utils/getOrders";

export default function Simulation() {


  // Стани для клієнтів та інших елементів
  const [orders, setOrders] = useState([]); // Create a new state for storing orders
  const [clients, setClients] = useState([]);
  const [cashRegisters, setCashRegisters] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cookers, setCookers] = useState([]);
  const [stages, setStages] = useState([]);
  const hasSentData = useRef(false); 
  const hasInitPlace = useRef(false); 
  const [ordersForModal, setOrdersForModal] = useState([]);

  const [isSended, setIsSended] = useState(true);

  useEffect(() => {
      if (hasSentData.current) return;

      const data = getLocalStorageData();
      console.log(data);
      sendDataToBackend(data);

      
      hasSentData.current = true;
  }, []);

  
  // Ініціалізація кухарів і станцій та касирів
  useEffect(() => {
    if (hasInitPlace.current) return;
    const container = document.getElementById("cooker-container");
    const casaElement = document.querySelector(".casa-image");
    const tableElement = document.querySelector(".table-image");

    const choosedCooks = localStorage.getItem("choosedCooks");
    const countOfCooks = Number(JSON.parse(choosedCooks));

    const choosedCashiers = localStorage.getItem("choosedCashRegisters");
    const countOfCashiers = Number(JSON.parse(choosedCashiers));
    


    if (container && casaElement && tableElement) {
      console.log("initial")
      casaElement.onload = () => initializeCashRegisters(casaElement, setCashRegisters);
      tableElement.onload = () => initializeCookersAndStations(tableElement, container, setCookers, setStages, countOfCooks);
      casaElement.onload = () => initializeCashiers(casaElement, container, setCashRegisters, countOfCashiers);
      hasInitPlace.current = true;
      

    }
    
  }, []);

  function testF() {
      moveToCookingStation(cookers[0], stages[1].name, stages);
      moveToCookingStation(cookers[1], stages[3].name,stages);
      moveToCookingStation(cookers[2], stages[2].name,stages);
    }


  useClientWebSocket(clients, setClients, setCashRegisters);


  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080/new/state");  // Використовуємо шлях /new/state

    socket.onopen = () => {
      console.log("WebSocket connected to /new/state");
      // socket.send(JSON.stringify({ message: "Hello from client" })); // Для перевірки
  };

  socket.onmessage = (event) => {
    try {
        const data = JSON.parse(event.data); // Якщо сервер відправляє JSON-дані
        console.log("Received data:", data);

        setOrders((currentOrders) => {
            const existingIndex = currentOrders.findIndex(order => order.orderId === data.orderId);
            // console.log(data.status);
            // if(currentOrders[existingIndex]) {
            //   console.log(currentOrders[existingIndex].status);
            // }
        
            let updatedOrders;

            if (existingIndex !== -1) {
                // Оновлюємо весь об'єкт, якщо знайдено orderId
                updatedOrders = [...currentOrders];
                updatedOrders[existingIndex] = { 
                    ...updatedOrders[existingIndex], 
                    ...data // Об'єднуємо всі нові дані
                };
            } else {
                // Додаємо новий ордер, якщо orderId ще немає
                updatedOrders = [data, ...currentOrders];
            }

            console.log("Updated orders:", updatedOrders); // Тут ти побачиш новий стан
            return updatedOrders;
        });
        
    } catch (error) {
        console.error("Error parsing message:", error);
    }
};

    socket.onerror = (error) => {
        console.error("WebSocket error:", error);
    };

    socket.onclose = () => {
        console.log("WebSocket closed");
    };

    return () => {
        if (socket.readyState === WebSocket.OPEN) {
            socket.close();  // Закриваємо з'єднання при розмонтуванні компонента
        }
    };
}, []);

useEffect(() => {
  console.log("Orders after update:", orders);
  console.log(clients)

  for(const client of clients) {
    console.log(client)
    console.log(client.orderId)
    
    const selectedClient = orders.find(order => 
      order.orderId === client.orderId && order.status === "ReadyForPickUp"
    );

    if (selectedClient) {
      console.log("додому")
      moveToExit(client);
      break;
    } 
    
  }
}, [orders]);


  
// function handlerDeleteOrder(orderToDelete) {
//     setOrders((currentOrders) => {
     
//       return currentOrders.filter(order => order.orderId !== orderToDelete.orderId)
      
      
//     }
      
        
//     );
    
// }
useMoveCookers(orders, setOrders, cookers, stages, isSended)

  // Відкриття модального вікна
  const handleTableClick = () => {
    setIsModalOpen(true)
    fetchOrders(setOrdersForModal);
  };
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
              {/* Відображаємо замовлення, якщо є дані */}
              {ordersForModal.length > 0 ? (
                ordersForModal.map((order) => (
                  <div key={order.id} className="order-item">
                    <div className="order-id">ID: {order.orderId}</div>
                    <div className="pizza-name">Pizza: {order.nameOfPizza}</div>
                    <div className="status">Status: {order.status}</div>
                  </div>
                ))
              ) : (
                <p>Немає замовлень</p>
              )}
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

const getLocalStorageData = () => {
  const data = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    data[key] = value;
  }
  return data;
};

