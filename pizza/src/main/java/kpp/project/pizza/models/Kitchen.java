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

        }else if (mode == 2){
            onePizzaOneCooker();
        }
    }

    public static int[] divideTimeByProportions(int totalTime) {
        double[] proportions = new double[]{0.2, 0.3, 0.3, 0.2};
        int[] parts = new int[proportions.length];
        int sum = 0;

        for (int i = 0; i < proportions.length - 1; i++) {
            parts[i] = (int) (totalTime * proportions[i]);
            sum += parts[i];
        }

        parts[proportions.length - 1] = totalTime - sum;

        return parts;
    }

    private static void onePizzaOneCooker() {
        while (true) {
            if (!STATIC_VALUES.cookers.isEmpty() && !pizzas.isEmpty()) {
                Cooker cooker = STATIC_VALUES.cookers.get(0);
                STATIC_VALUES.cookers.remove(cooker);

                Pizza pizzaFromQueue = pizzas.poll();
                cooker.setPizza(pizzaFromQueue);

                // Розділити час приготування на 4 частини
                int timeToCook = pizzaFromQueue.getCookingTime();
                int[] times = divideTimeByProportions(timeToCook);

                Thread t = new Thread(() -> {
                    try {
                        Thread.sleep(times[0] * 1000);
                        cooker.getPizza().nextStatus();
                        System.out.println("Перший етап завершено!");

                        Thread.sleep(times[1] * 1000);
                        cooker.getPizza().nextStatus();
                        System.out.println("Другий етап завершено!");

                        Thread.sleep(times[2] * 1000);
                        cooker.getPizza().nextStatus();
                        System.out.println("Третій етап завершено!");

                        Thread.sleep(times[3] * 1000);
                        cooker.getPizza().nextStatus();
                        System.out.println("Процес завершено!");

                        synchronized (STATIC_VALUES.cookers) {
                            STATIC_VALUES.cookers.add(cooker);
                        }
                    } catch (InterruptedException e) {
                        System.err.println("Потік було перервано: " + e.getMessage());
                    }
                });

                t.start();
            }
        }
    }

}
