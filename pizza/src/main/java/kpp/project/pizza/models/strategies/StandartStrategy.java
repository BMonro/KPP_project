package kpp.project.pizza.models.strategies;

import kpp.project.pizza.models.Pizzeria;

public class StandartStrategy implements IPizzaStrategy {
    @Override
    public Pizzeria createPizzeria() {
        // Логіка для створення піцерії за стандартною стратегією
        System.out.println("Створення піцерії за стандартною стратегією.");
        return new Pizzeria(); // Повертає новий об'єкт Pizzeria
    }

    @Override
    public void generateDelays(Pizzeria pizzeria) {
        // Логіка для генерації стандартних затримок
        System.out.println("Генерація стандартних затримок у піцерії.");
    }
}
