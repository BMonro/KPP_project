import { moveToCashRegister } from "@/components/movingFunctions";
import { useEffect } from "react";

const useClientWebSocket = (clients, setClients, setCashRegisters) => {
    useEffect(() => {
        const socket = new WebSocket("ws://localhost:8080/ws");

        socket.onopen = () => {
            console.log("Client connected");
        };

        socket.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                const { order: clientOrder, idCashier } = data;
                console.log("Received data:", data);

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
                const { x: clientX, y: clientY } = calculateClientPosition(casaRect, clients.length);

                const newClient = new Client(
                    document.getElementById("cooker-container"),
                    `Client ${clients.length + 1}`,
                    formatOrder(clientOrder),
                    cashierID,
                    clientX,
                    clientY
                );

                setClients((prevClients) => [...prevClients, newClient]);
                sendDataToKitchen(JSON.stringify(clientOrder));
                moveToCashRegister(newClient, cashierID, setCashRegisters);
            } catch (error) {
                console.error("Помилка обробки повідомлення:", error);
            }
        };

        socket.onerror = (error) => {
            socket.onerror = (error) => {
                console.error("Ошибка WebSocket:", error.message);
                console.error("Состояние соединения:", socket.readyState);
            };

        };

        socket.onclose = () => {
            console.log("WebSocket connection closed.");
        };

        return () => socket.close();
    }, []); // Порожній масив залежностей для стабільності
};

const calculateClientPosition = (casaRect, index) => {
    const casaX = casaRect.left;
    const casaY = casaRect.top;
    const casaWidth = casaRect.width;
    const casaHeight = casaRect.height;

    return {
        x: casaX + casaWidth * 0.1 + (index % 9) * casaWidth * 0.1,
        y: casaY + casaHeight * 0.4 + Math.floor(index / 9) * casaHeight * 0.1,
    };
};

export default useClientWebSocket;
