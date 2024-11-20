import { moveToCashRegister } from "@/components/movingFunctions";
import { useEffect } from "react";

const useClientWebSocket = (clients, setClients, setCashRegisters) => {
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
                setClients((prevClients) => [...prevClients, newClient]);
                sendDataToKitchen(JSON.stringify(data.order));
                // Переміщення клієнта до касового апарату
                moveToCashRegister(newClient, cashierID, setCashRegisters);
            } catch (error) {
                console.error("Помилка обробки повідомлення:", error);
            }
        };

        return () => socket.close();
    }, [clients, setClients, setCashRegisters]);
};

export default useClientWebSocket;
