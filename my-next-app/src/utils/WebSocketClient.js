// WebSocketClient.js
export class WebSocketClient {
  constructor(url) {
    this.url = url;
    this.socket = null;
    this.onMessageCallback = null;
  }

  connect() {
    this.socket = new WebSocket(this.url);

    this.socket.onopen = () => {
      console.log("WebSocket connection established.");
    };

    this.socket.onmessage = (event) => {
      try {
        const customerData = JSON.parse(event.data);
        console.log("Received customer data:", customerData);
        if (this.onMessageCallback) {
          this.onMessageCallback(customerData);
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    this.socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    this.socket.onclose = () => {
      console.log("WebSocket connection closed.");
    };
  }

  onMessage(callback) {
    this.onMessageCallback = callback;
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
    }
  }
}
