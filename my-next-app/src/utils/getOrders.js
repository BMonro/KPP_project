export async function fetchOrders (setOrders){
    try {
      const response = await fetch('http://localhost:8080/orders');
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      } else {
        console.error('Не вдалося завантажити замовлення');
      }
    } catch (error) {
      console.error('Помилка при запиті:', error);
    }
  };