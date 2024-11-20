package kpp.project.pizza.models;

import com.google.gson.Gson;
import kpp.project.pizza.models.statuses.Ordered;

import java.util.List;
import java.util.Queue;

public class Kitchen  extends Thread{
    private static int mode;
    private static List<Cooker> employees;
    private static Queue<Pizza> pizzas;
    private static Simulation simulation;
    public Kitchen() {}
    public void addPizza(Pizza pizza) {
        pizza.setState(new Ordered());
        pizzas.add(pizza);
    }
    public void setMode(int mode1) {mode = mode1;}
    public Pizza getPizza() {
        return pizzas.poll();
    }
    public void setEmployees(List<Cooker> employees) {}

    @Override
    public void run() {
        if(mode==1){
            onePizzaOneState();
        }else if (mode == 2){
            onePizzaOneCooker();
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
                            //simulation.sendCustomerData(pizza1.getState(), pizza1.getName(), pizza1.getOrderId());
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
        Logger logger = new Logger(); // Створюємо спостерігача

        while (true) {
            if (!STATIC_VALUES.cookers.isEmpty() && !pizzas.isEmpty()) {
                Cooker cooker = STATIC_VALUES.cookers.get(0);
                STATIC_VALUES.cookers.remove(cooker);

                Pizza pizzaFromQueue = pizzas.poll();
                pizzaFromQueue.addObserver(logger);
                cooker.setPizza(pizzaFromQueue);

                int timeToCook = pizzaFromQueue.getCookingTime();
                int[] times = divideTimeByProportions(timeToCook);

                Thread t = new Thread(() -> {
                    try {
                        Thread.sleep(times[0] * 1000);
                        cooker.getPizza().nextStatus();
                        sendpizzaDtoData(new PizzaDataDTO(cooker.getPizza().getState().getClass().getName(),cooker.getPizza().getName(),cooker.getPizza().getOrderId()));
                        System.out.println("Перший етап завершено!");

                        Thread.sleep(times[1] * 1000);
                        cooker.getPizza().nextStatus();
                        sendpizzaDtoData(new PizzaDataDTO(cooker.getPizza().getState().getClass().getName(),cooker.getPizza().getName(),cooker.getPizza().getOrderId()));
                        System.out.println("Другий етап завершено!");

                        Thread.sleep(times[2] * 1000);
                        cooker.getPizza().nextStatus();
                        sendpizzaDtoData(new PizzaDataDTO(cooker.getPizza().getState().getClass().getName(),cooker.getPizza().getName(),cooker.getPizza().getOrderId()));
                        System.out.println("Третій етап завершено!");

                        Thread.sleep(times[3] * 1000);
                        cooker.getPizza().nextStatus();
                        sendpizzaDtoData(new PizzaDataDTO(cooker.getPizza().getState().getClass().getName(),cooker.getPizza().getName(),cooker.getPizza().getOrderId()));
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


    public static void sendpizzaDtoData(PizzaDataDTO pizzaDataDTO) {
        try {
            Gson gson = new Gson();
            String json = gson.toJson(pizzaDataDTO);
            WebSocketStateHandler.sendMessageToAll(json);
            System.out.println("Sent pizza data: " + json);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


}
