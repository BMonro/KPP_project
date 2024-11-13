package kpp.project.pizza.models.strategies;

public class RushHourStrategy implements IPizzaStrategy {

    // Статична змінна для відстеження кількості викликів
    private static int callCount = 0;

    @Override
    public int generateDelays() {
        // Збільшуємо лічильник кожного разу, коли викликається метод
        callCount++;

        // Генеруємо число, яке залежить від кількості викликів
        return Math.max((60 - 2 * callCount), 15); // Наприклад, затримка зростає на 2 кожного разу
    }
}
