package kpp.project.pizza.models.statuses;

public class Packing implements IPizzaStatus {
    private int timeToBake;
    @Override
    public void next() {
        System.out.println("Moving to the next state...");
    }

    @Override
    public void getState() {
        System.out.println("Getting current state...");
    }
}
