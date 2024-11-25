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
            for(Pizza p : order.getPizzas()){
                if(p.getOrderId() == orderId){
                    order.getPizzas().remove(p);
                    break;
                }
            }
            if(order.getPizzas().isEmpty()){
                orders.remove(order);
                break;
            }
        }
    }

}
