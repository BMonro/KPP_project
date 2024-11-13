package kpp.project.pizza.models.decorators;

import kpp.project.pizza.models.Pizza;

public class PizzaDecoratorOtherIngredients extends PizzaDecorator {
    public PizzaDecoratorOtherIngredients(Pizza pizza) {
        super(pizza);
    }

    @Override
    public double getPrice() {
        return super.getPrice() + 1.5; // додає вартість інших інгредієнтів
    }

    @Override
    public String getName() {
        return super.getName() + ", з іншими інгредієнтами";
    }
}
