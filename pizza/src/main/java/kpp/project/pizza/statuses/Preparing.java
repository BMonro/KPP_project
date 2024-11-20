package kpp.project.pizza.statuses;

import kpp.project.pizza.models.Pizza;

public class Preparing implements IPizzaStatus{

    @Override
    public void next(Pizza pizza) {
        pizza.setState(new Baking());
    }

}
