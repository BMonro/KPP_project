package kpp.project.pizza.models;

import java.util.List;

public class Cooker {
    private String name;
    private Pizza pizza;

    public Cooker(String name) {
        this.name = name;
    }

    // Метод для оновлення статусу з можливістю затримки
    public void editStatus(String status, int delay) {

    }

    // Метод для зупинки роботи
    public void stopWork() {

    }

    // Метод для отримання наступного замовлення з наданого списку
    public void getNextOrder(List<Order> orders) {

    }

    public Pizza getPizza() {
        return this.pizza;
    }

    public void setPizza(Pizza pizza) {
        this.pizza = pizza;
    }
}
