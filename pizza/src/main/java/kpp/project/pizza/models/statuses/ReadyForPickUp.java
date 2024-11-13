package kpp.project.pizza.models.statuses;

public class ReadyForPickUp implements IPizzaStatus{
    private int orderId;
    @Override
    public void next() {
        System.out.println("Moving to the next state...");
    }

    @Override
    public void getState() {
        System.out.println("Getting current state...");
    }
}
