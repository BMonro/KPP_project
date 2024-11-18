package kpp.project.pizza.models;

public class Magazine implements Observer {
    @Override
    public void update(Pizza pizza) {
        System.out.println("Magazine notified: Pizza " + pizza.getName() +
                " (Order ID: " + pizza.getOrderId() + ") is now " + pizza.getState().toString());
    }
}

