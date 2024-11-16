package kpp.project.pizza.models.statuses;

import kpp.project.pizza.models.Pizza;

public class Baking implements IPizzaStatus {
    @Override
    public void next(Pizza pizza) {
        pizza.setState(new Packing());
    }
}
