package kpp.project.pizza.models.strategies;

import kpp.project.pizza.models.Pizzeria;

import java.util.Random;

public class RandomStrategy implements IPizzaStrategy {
    private Random random = new Random();

    @Override
    public Pizzeria createPizzeria() {
        // Логіка для створення піцерії з випадковими налаштуваннями
        System.out.println("Створення піцерії з випадковими налаштуваннями.");
        return null; // Повертає новий об'єкт Pizzeria
    }

    @Override
    public void generateDelays(Pizzeria pizzeria) {
        // Логіка для генерації випадкових затримок
        int delay = random.nextInt(15); // Генерує випадкову затримку до 15
        System.out.println("Генерація випадкової затримки: " + delay + " у піцерії.");
    }
}
