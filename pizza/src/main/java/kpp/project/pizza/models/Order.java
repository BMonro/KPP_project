package kpp.project.pizza.models;

import java.util.List;

public class Order {
    // Поле для зберігання ідентифікатора замовлення
    public int orderID;

    // Поле для зберігання номера столика
    public int tableNumber;

    // Поле для зберігання списку піц у замовленні
    public List<Pizza> pizzas;

    // Поле для зберігання списку напоїв у замовленні
    public List<Drink> drinks;

    // Поле для зберігання статусу замовлення
    public String status;

    // Метод для отримання статусу замовлення
    public String getOrderStatus() {
        return status;
    }
}
