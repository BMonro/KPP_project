package kpp.project.pizza.models;

import com.fasterxml.jackson.annotation.JsonProperty;

public class PizzaDataDTO {
    @JsonProperty
    private String status;
    @JsonProperty
    private String nameOfPizza;
    @JsonProperty
    private int orderId;

    public PizzaDataDTO(String status, String nameOfPizza, int orderId) {
        this.status = status;
        this.nameOfPizza = nameOfPizza;
        this.orderId = orderId;
    }
}

