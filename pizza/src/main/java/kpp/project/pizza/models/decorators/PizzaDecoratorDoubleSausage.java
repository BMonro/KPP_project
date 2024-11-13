package kpp.project.pizza.models.decorators;

import kpp.project.pizza.models.Pizza;

public class PizzaDecoratorDoubleSausage extends PizzaDecorator {
    public PizzaDecoratorDoubleSausage(Pizza pizza) {
        super(pizza);
    }

    @Override
    public double getPrice() {
        return super.getPrice() + 2.5; // додає вартість додаткової ковбаси
    }

    @Override
    public String getName() {
        return super.getName() + ", з подвійною ковбасою";
    }
}
