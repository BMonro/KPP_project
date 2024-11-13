package kpp.project.pizza.models.statuses;

public interface IPizzaStatus {
    public abstract void next();
    public abstract void getState();

    public default void stop(){

    }
}
