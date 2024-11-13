package kpp.project.pizza.models.decorators;

import kpp.project.pizza.models.Pizza;

public class PizzaDecoratorSauce extends PizzaDecorator {
    public PizzaDecoratorSauce(Pizza pizza) {
        super(pizza);
    }

    @Override
    public double getPrice() {
        return super.getPrice() + 0.5; // додає вартість соусу
    }

    @Override
    public String getName() {
        return super.getName() + ", з соусом";
    }
}
