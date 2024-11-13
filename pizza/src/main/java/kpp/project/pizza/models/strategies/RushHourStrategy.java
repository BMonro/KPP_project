package kpp.project.pizza.models.strategies;

import kpp.project.pizza.models.Pizzeria;

public class RushHourStrategy implements IPizzaStrategy {
    @Override
    public Pizzeria createPizzeria() {
        // Логіка для створення піцерії у час пік
        System.out.println("Створення піцерії з врахуванням часу пік.");
        return new Pizzeria(); // Повертає новий об'єкт Pizzeria
    }

    @Override
    public void generateDelays(Pizzeria pizzeria) {
        // Логіка для генерації затримок у час пік
        System.out.println("Генерація затримок у час пік у піцерії.");
    }
}
