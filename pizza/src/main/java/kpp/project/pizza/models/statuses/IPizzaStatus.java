package kpp.project.pizza.models.statuses;

import kpp.project.pizza.models.Pizza;
import kpp.project.pizza.models.Pizzeria;

public interface IPizzaStatus {
    void next(Pizza pizza);
}
