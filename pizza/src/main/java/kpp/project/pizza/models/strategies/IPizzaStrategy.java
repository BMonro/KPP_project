package kpp.project.pizza.models.strategies;

import kpp.project.pizza.models.Pizzeria;

public interface IPizzaStrategy {
    // Метод для створення піцерії
    Pizzeria createPizzeria();

    // Метод для генерації затримок у піцерії
    void generateDelays(Pizzeria pizzeria);
}
