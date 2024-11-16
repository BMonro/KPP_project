package kpp.project.pizza.models;

import java.util.Queue;

public class Kitchen {
    private Queue<Pizza> pizzas;
    public Kitchen() {}
    public void addPizza(Pizza pizza) {
        pizzas.add(pizza);
    }
    public Pizza getPizza() {
        return pizzas.peek();
    }
}
