package kpp.project.pizza.models;

import kpp.project.pizza.models.statuses.Ordered;

import java.util.List;
import java.util.Queue;

public class Kitchen  extends Thread{
    private static int mode;
    private static List<Cooker> employees;
    private static Queue<Pizza> pizzas;
    public Kitchen() {}
    public void addPizza(Pizza pizza) {
        pizza.setState(new Ordered());
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
    private static void onePizzaOneCooker(){
        while(true){
            if(  !STATIC_VALUES.cookers.isEmpty()){
                Cooker cooker = STATIC_VALUES.cookers.getFirst();
                STATIC_VALUES.cookers.remove(cooker);

            }
        }
    }

}
