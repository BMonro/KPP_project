export const sendDataToBackend = async (data) => {
    try {
        if (Object.keys(data).length > 0) {
            const response = await fetch('http://localhost:8080/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data: data }),
            });
            const responseData = await response.json();
            console.log('Success:', responseData);
        } else {
            console.log('No data in localStorage');
        }
    } catch (error) {
        console.error('Error:', error);
    }
};
export const sendDataToKitchen = async (data) => {
    try {
        console.log("sendDataToKitchen called with data:", data);

        // Перевіряємо, чи є дані
        if (Object.keys(data).length > 0) {
            console.log("Sending data to kitchen:", data);

            // Відправка даних на сервер без вкладення у поле "order"
            const response = await fetch('http://localhost:8080/kitchen', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data), // Відправляємо тільки сам об'єкт Order
            });

            // Лог після отримання відповіді
            console.log("Response received from server:", response);

            // Перетворюємо відповідь у JSON
            const responseData = await response.json();
            console.log('Success:', responseData);
        } else {
            console.log('No data to send');
        }
    } catch (error) {
        // Лог помилки
        console.error('Error in sendDataToKitchen:', error);
    }
};
