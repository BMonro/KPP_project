package kpp.project.pizza.models;

import java.util.List;

public class Customer {
    private Order order;
    private String idCashier;

    // Геттер для поля order
    public Order getOrder() {
        return order;
    }

    // Сеттер для поля order
    public void setOrder(Order order) {
        this.order = order;
    }

    // Геттер для поля idCashier
    public String getIdCashier() {
        return idCashier;
    }

    // Сеттер для поля idCashier
    public void setIdCashier(String idCashier) {
        this.idCashier = idCashier;
    }
}
