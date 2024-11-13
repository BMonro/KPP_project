package kpp.project.pizza.models.decorators;

import kpp.project.pizza.models.Pizza;

public class PizzaDecoratorDoubleCheese extends PizzaDecorator {
    public PizzaDecoratorDoubleCheese(Pizza pizza) {
        super(pizza);
    }

    @Override
    public double getPrice() {
        return super.getPrice() + 2.0; // додає вартість додаткового сиру
    }

    @Override
    public String getName() {
        return super.getName() + ", з подвійним сиром";
    }
}
