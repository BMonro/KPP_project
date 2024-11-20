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
}

