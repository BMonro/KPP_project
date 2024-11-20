import { WebSocketClient } from "@/utils/WebSocketClient";

export function fetchCustomersWebSocket(setCustomers) {
  const wsClient = new WebSocketClient("ws://localhost:8080/ws"); // Заміни URL
  wsClient.connect();

  wsClient.onMessage((customer) => {
    console.log("Новий клієнт:", customer);

    setCustomers((prevCustomers) => {
      const isDuplicate = prevCustomers.some(
        (existingCustomer) => existingCustomer.id === customer.id
      );
      if (isDuplicate) return prevCustomers; // Уникаємо дублювання
      return [...prevCustomers, customer];
    });
  });

  return () => {
    wsClient.disconnect();
  };
}
