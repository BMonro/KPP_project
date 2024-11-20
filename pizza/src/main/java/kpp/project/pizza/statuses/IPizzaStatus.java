package kpp.project.pizza.statuses;

import kpp.project.pizza.models.Pizza;
import kpp.project.pizza.models.Pizzeria;

public interface IPizzaStatus {
    void next(Pizza pizza);
}
