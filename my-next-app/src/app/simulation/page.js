"use client";

import { useEffect, useState, useRef } from "react";
import Header from "@/components/SimulationHeader";
import Client from "@/components/Client";

import { sendDataToBackend} from "@/utils/sentData";
import { moveToCookingStation } from "@/components/movingFunctions";
import { initializeCookersAndStations } from "@/components/cookersWork";
import { initializeCashRegisters } from "@/components/CashRegisters";
import { initializeCashiers } from "@/components/cashiersWork";
import useClientWebSocket from "@/hooks/useClientWebSocket";


export default function Simulation() {

  // Стани для клієнтів та інших елементів
  const [clients, setClients] = useState([]);
  const [cashRegisters, setCashRegisters] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cookers, setCookers] = useState([]);
  const [stages, setStages] = useState([]);
  const hasSentData = useRef(false); 
  const hasInitPlace = useRef(false); 
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

    if (container && casaElement && tableElement) {
      console.log("initial")
      casaElement.onload = () => initializeCashRegisters(casaElement, setCashRegisters);
      tableElement.onload = () => initializeCookersAndStations(tableElement, container, setCookers, setStages);
      casaElement.onload = () => initializeCashiers(casaElement, container, setCashRegisters);
      hasInitPlace.current = true;
      

    }
    
  }, []);

  function testF() {
      moveToCookingStation(cookers[0], stages[1].name, stages);
      moveToCookingStation(cookers[1], stages[3].name,stages);
      moveToCookingStation(cookers[2], stages[2].name,stages);
    }


  useClientWebSocket(clients, setClients, setCashRegisters);
  // useCookerWebSocket();
  // Обробка WebSocket з бекенду для отримання даних
  // useEffect(() => {
  //   const socket = new WebSocket("ws://localhost:8080/new/state");
  
  //   socket.onopen = () => {
  //     console.log("WebSocket connected");
  //   };
  
  //   socket.onmessage = (event) => {
  //     try {
  //       const data = JSON.parse(event.data);
  //       console.log("Received data:", data);

  //     } catch (error) {
  //       console.error("Error processing message:", error);
  //     }
  //   };
  
  //   socket.onerror = (error) => {
  //     console.error("WebSocket error:", error);
  //   };
  
  //   socket.onclose = () => {
  //     console.log("WebSocket closed");
  //   };
  
  //   return () => {
  //     socket.close();
  //   };
  // }, []);
  
 
  console.log(cookers, stages)

  

  // Відкриття модального вікна
  const handleTableClick = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="h-screen overflow-hidden">
    <button onClick={testF} >
            test button
            </button>
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

const getLocalStorageData = () => {
  const data = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    data[key] = value;
  }
  return data;
};

