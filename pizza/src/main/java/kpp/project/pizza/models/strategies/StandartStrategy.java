package kpp.project.pizza.models.strategies;

import kpp.project.pizza.models.Pizzeria;

public class StandartStrategy implements IPizzaStrategy {

    @Override
    public int generateDelays() {
        return 30;
    }
}
