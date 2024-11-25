package kpp.project.pizza.statuses;

import kpp.project.pizza.models.Kitchen;
import kpp.project.pizza.models.Order;
import kpp.project.pizza.models.Pizza;
import kpp.project.pizza.models.Pizzeria;

import java.util.ArrayList;
import java.util.List;

public class Packing implements IPizzaStatus {
    @Override
    public void next(Pizza pizza) {
        pizza.setState(new ReadyForPickUp());
        int orderId = pizza.getOrderId();
        List<Order> orders = Pizzeria.getInstance().getOrders();
        for (Order order : orders) {
            if (order.getOrderID() == orderId) {
                List<Pizza> pizzas = order.getPizzas();
                List<Pizza> newPizzas = new ArrayList<>();
                for (Pizza p : pizzas) {
                    if (!p.getName().equals(pizza.getName())) {
                        newPizzas.add(p);
                    }
                }
                if(newPizzas.size() == 0){
                    orders.remove(order);
                } else {
                    order.setPizzas(newPizzas);
                }
                break;
            }
        }
    }

}
