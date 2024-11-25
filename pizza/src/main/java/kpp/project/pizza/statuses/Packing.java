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

    }

}
