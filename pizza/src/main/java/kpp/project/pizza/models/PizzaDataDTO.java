package kpp.project.pizza.models;

public class PizzaDataDTO {
    private String status;
    private String nameOfPizza;
    private int orderId;

    public PizzaDataDTO(String status, String nameOfPizza, int orderId) {
        this.status = status;
        this.nameOfPizza = nameOfPizza;
        this.orderId = orderId;
    }

    // Гетери та сетери, якщо потрібні
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getNameOfPizza() {
        return nameOfPizza;
    }

    public void setNameOfPizza(String nameOfPizza) {
        this.nameOfPizza = nameOfPizza;
    }

    public int getOrderId() {
        return orderId;
    }

    public void setOrderId(int orderId) {
        this.orderId = orderId;
    }
}

