package kpp.project.pizza.models;

import java.util.List;
import java.util.stream.Collectors;

public class Order {
    private static int numberOfOrders = 0;
    // Поле для зберігання ідентифікатора замовлення
    private int orderID;

    // Поле для зберігання списку піц у замовленні
    private List<Pizza> pizzas;

    // Поле для зберігання списку напоїв у замовленні
    private List<Drink> drinks;

    // Поле для зберігання статусу замовлення
    private String status;

    // Гетери та сетери
    public int getOrderID() {
        return orderID;
    }
    public Order(){
        orderID = ++numberOfOrders;
    }

    public List<Pizza> getPizzas() {
        return pizzas;
    }

    public void setPizzas(List<Pizza> pizzas) {
        this.pizzas = pizzas;
    }

    public List<Drink> getDrinks() {
        return drinks;
    }

    public void setDrinks(List<Drink> drinks) {
        this.drinks = drinks;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    // Метод для отримання статусу замовлення
    public String getOrderStatus() {
        return status;
    }
    @Override
    public String toString() {
        return "Order {" +
                "orderID=" + orderID +
                ", pizzas=" + (pizzas != null ? pizzas.stream()
                .map(Pizza::toString)
                .collect(Collectors.joining(", ")) : "[]") +
                ", drinks=" + (drinks != null ? drinks.stream()
                .map(Drink::toString)
                .collect(Collectors.joining(", ")) : "[]") +
                ", status='" + status + '\'' +
                '}';
    }
}

