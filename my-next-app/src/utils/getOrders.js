export async function fetchOrders (setOrders){
    try {
      const response = await fetch('http://localhost:8080/orders');
      if (response.ok) {
        const data = await response.json();
        const dataWithIds = data.map((item, index) => ({
          ...item, // Зберігаємо існуючі поля
          id: index + 1 // Додаємо нове поле id
        }));
        setOrders(dataWithIds);
      } else {
        console.error('Не вдалося завантажити замовлення');
      }
    } catch (error) {
      console.error('Помилка при запиті:', error);
    }
  };