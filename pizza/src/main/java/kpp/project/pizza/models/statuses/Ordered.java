package kpp.project.pizza.models.statuses;

public class Ordered implements IPizzaStatus{
    @Override
    public void next() {
        System.out.println("Moving to the next state...");
    }

    @Override
    public void getState() {
        System.out.println("Getting current state...");
    }
}
