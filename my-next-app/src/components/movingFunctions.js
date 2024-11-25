import {sendDataToKitchen } from "@/utils/sentData";
let index = 0; // Статична змінна для відстеження зміщення

  
  export function moveToCookingStation(cooker, stationName, stages) {
      // Знаходимо потрібну станцію за назвою
      const station = stages.find((stage) => stage.name === stationName);
    
      // Якщо станція не знайдена або вона зайнята, виходимо
      // if (!station || !station.isFree) {
      //   console.log(`${stationName} is currently occupied or does not exist.`);
      //   return;
      // }
    
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

    export function moveToCashRegister(client, cashierIndex, setCashRegisters) {
      
      setCashRegisters((prevCashiers) => {
        const cashier = prevCashiers[cashierIndex];
        if (!cashier || !cashier.isFree) {
          console.log(`Cashier ${cashierIndex + 1} is currently occupied or does not exist.`);
          return prevCashiers; // Якщо каса зайнята, нічого не робимо
        }
    
        const updatedCashiers = [...prevCashiers];
        updatedCashiers[cashierIndex] = { ...cashier, isFree: false }; // Позначаємо касу зайнятою
    
        // Переміщуємо клієнта до касира
        client.moveTo(cashier.x, cashier.y + 75, () => {
          console.log(`${client.name} reached ${cashier.name}.`);
          setTimeout(() => {
            setCashRegisters((prev) => {
              const resetCashiers = [...prev];
              resetCashiers[cashierIndex] = { ...cashier, isFree: true }; // Робимо касу вільною після затримки
              console.log(`${cashier.name} is now free.`);
              return resetCashiers;
            });
            console.log("moving to waiting station");
            //sendDataToKitchen(client.info);
            moveToWaitingStation(client);
          }, 3000); 
        });
    
        return updatedCashiers;
      });
    }
    export function moveToWaitingStation(client) {
      // Знаходимо елемент .table-image для визначення базової позиції
      const tableElement = document.querySelector(".table-image");
      if (!tableElement) {
        console.error("Table element not found.");
        return;
      }
    
      // Отримуємо координати .table-image
      const tableRect = tableElement.getBoundingClientRect();

      const waitingAreaX = tableRect.right + 75 +  Math.floor(index / 5)*25; // Координата X (праворуч від столу, з відступом)
      const waitingAreaY = tableRect.top - 45 + (index%5)*25;

      // Оновлюємо зміщення для наступного клієнта
      index ++;
    
      // Переміщуємо клієнта до розрахованої позиції
      client.moveTo(waitingAreaX, waitingAreaY, () => {
        console.log(`${client.name} reached waiting area`);
      });
    }

    export function moveToExit(client) {
      // Визначаємо розміри екрана для правого нижнього кута
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
    
      // Розраховуємо координати правого нижнього кута
      const exitX = screenWidth - 20; // Відступ 20 пікселів від правого краю
      const exitY = screenHeight - 20; // Відступ 20 пікселів від нижнього краю
    
      // Переміщуємо клієнта до цієї точки
      client.moveTo(exitX, exitY, () => {
        console.log(`${client.name} has exited the pizzeria.`);
    
        setTimeout(() => {
          client.element.remove(); // Видаляємо елемент з DOM
        }, 500); // Невелика затримка для анімації зникнення
      });
    }
    