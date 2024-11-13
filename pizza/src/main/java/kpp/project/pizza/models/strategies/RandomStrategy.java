package kpp.project.pizza.models.strategies;

import kpp.project.pizza.models.Pizzeria;

import java.util.Random;

public class RandomStrategy implements IPizzaStrategy {
    private Random random = new Random();

    @Override
    public int generateDelays() {
        // Логіка для генерації випадкових затримок
        int delay = random.nextInt(15); // Генерує випадкову затримку до 15
        return delay;
    }
}
