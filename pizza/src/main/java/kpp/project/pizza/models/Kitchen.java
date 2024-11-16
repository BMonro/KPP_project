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


    public static void setMode(int mode1) {mode = mode1;}
    @Override
    public void run() {
        if(mode==1){

        }else{

        }
    }
    private static void onePizzaOneState(){
        while(true){
            if(!pizzas.isEmpty()){
                Cooker cooker = employees.getFirst();
                while (cooker.getPizza()==null){}
                cooker.setPizza(pizzas.poll());
                Thread t = new Thread(()->{
                    try {
                        for(int i=1;i<employees.size();i++){
                            Pizza pizza1 = employees.get(i-1).getPizza();
                            double time = pizza1.getCookingTime()/4.0;
                            pizza1.nextStatus();
                            Cooker cooker1 = employees.get(i);
                            Thread.sleep((int)(time*1000));
                            employees.get(i-1).setPizza(null);
                            while (cooker1.getPizza()==null){}
                            cooker.setPizza(pizza1);
                        }
                    } catch (InterruptedException e) {
                        throw new RuntimeException(e);
                    }
                });
                t.start();
            }
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
