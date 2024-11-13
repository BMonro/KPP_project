package kpp.project.pizza.models.decorators;

import kpp.project.pizza.models.Pizza;

public abstract class PizzaDecorator {
    private Pizza wrapped;

    // Конструктор, який приймає об’єкт Pizza
    public PizzaDecorator(Pizza p) {
        this.wrapped = p;
    }

    // Геттер для об’єкта Pizza
    public Pizza getWrappedPizza() {
        return wrapped;
    }

    // Сеттер для об’єкта Pizza
    public void setWrappedPizza(Pizza wrappedPizza) {
        this.wrapped = wrappedPizza;
    }

    // Метод для переходу до наступного етапу приготування
    public void doNextCookingStage() {
        System.out.println("Переходжу до наступного етапу приготування...");
        // Реалізація логіки переходу до наступного етапу
        // Можливо, виклик wrappedPizza.doNextCookingStage(), якщо піца має такий метод
    }

    // Метод для зупинки наступного етапу приготування
    public void stopNextCookingStage() {
        System.out.println("Зупинка наступного етапу приготування...");
        // Реалізація логіки зупинки етапу приготування
    }

    // Абстрактні методи для отримання ціни та назви, які повинні бути реалізовані в підкласах
    public double getPrice() {
        return 0;
    }

    public String getName() {
        return null;
    }
}
