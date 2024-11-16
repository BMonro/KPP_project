package kpp.project.pizza.models;

import java.util.List;
import java.util.Queue;

public class Kitchen  extends Thread{
    private int mode;
    private List<Cooker> employees;
    private Queue<Pizza> pizzas;
    public Kitchen() {}
    public void addPizza(Pizza pizza) {
        pizzas.add(pizza);
    }
    public Pizza getPizza() {
        return pizzas.poll();
    }
    public void setEmployees(List<Cooker> employees) {}

    @Override
    public void run() {
        if(mode==1){

        }else{

        }
    }
}
