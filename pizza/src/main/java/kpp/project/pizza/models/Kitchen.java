package kpp.project.pizza.models;

import com.google.gson.Gson;
import kpp.project.pizza.sockets.WebSocketStateHandler;
import kpp.project.pizza.statuses.Ordered;

import java.util.List;
import java.util.Queue;
import java.util.LinkedList;

public class Kitchen  extends Thread{
    private static int mode;
    private static List<Cooker> employees;
    private static Queue<Pizza> pizzas;
    private boolean running = false;
    public Kitchen() {
        pizzas = new LinkedList<>();
    }
    public void addPizza(Pizza pizza) {
        pizza.setState(new Ordered());
        pizzas.add(pizza);
    }
    public void setMode(int mode1) {mode = mode1;}
    public Pizza getPizza() {
        return pizzas.poll();
    }
    public void setEmployees(List<Cooker> employees) {}
    public synchronized boolean isRunning() {
        return running;
    }
    @Override
    public void run() {
        running = true;
        try {
            if (mode == 1) {
                onePizzaOneState();
            } else if (mode == 2) {
                onePizzaOneCooker();
            }
        } finally {
            running = false; // Ensure the state is reset when the thread finishes
        }
    }
    private static void onePizzaOneState(){
        Logger logger = new Logger();
        while(true){
            if(!pizzas.isEmpty()){
                Cooker cooker = STATIC_VALUES.cookers.get(0);
                System.out.println(cooker.getName()+" "+cooker.getPizza());
                while (cooker.getPizza()!=null){
                    try {
                        Thread.sleep(50);
                    } catch (InterruptedException e) {
                        throw new RuntimeException(e);
                    }
                }
                cooker.setPizza(pizzas.poll());
                logger.update(cooker.getPizza());
                Thread t = new Thread(()->{
                    try {
                        for(int i=1;i<STATIC_VALUES.cookers.size();i++){
                            Pizza pizza1 = STATIC_VALUES.cookers.get(i-1).getPizza();
                            double time = pizza1.getCookingTime()/4.0;
                            cooker.checkAndPauseIfNeeded();
                            pizza1.nextStatus();
                            logger.update(pizza1);
                            sendpizzaDtoData(new PizzaDataDTO(pizza1.getState().getClass().getName().replaceAll("kpp.project.pizza.statuses.",""),pizza1.getName(),pizza1.getOrderId()));
                            Cooker cooker1 = STATIC_VALUES.cookers.get(i);
                            Thread.sleep((int)(time*1000));
                            STATIC_VALUES.cookers.get(i-1).setPizza(null);
                            System.out.println(cooker.getName()+" "+cooker.getPizza());
                            while (cooker1.getPizza()!=null){
                                try {
                                    Thread.sleep(50);
                                } catch (InterruptedException e) {
                                    throw new RuntimeException(e);
                                }
                            }
                            cooker1.setPizza(pizza1);
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
                cooker.setPizza(pizzaFromQueue);

                int timeToCook = 30;//pizzaFromQueue.getCookingTime();
                System.out.println("Час приготування піци: " + timeToCook);
                int[] times = divideTimeByProportions(timeToCook);

                Thread t = new Thread(() -> {
                    try {
                        Thread.sleep(times[0] * 1000);
                        cooker.checkAndPauseIfNeeded();
                        cooker.getPizza().nextStatus();
                        logger.update(cooker.getPizza());
                        sendpizzaDtoData(new PizzaDataDTO(cooker.getPizza().getState().getClass().getName().replaceAll("kpp.project.pizza.statuses.",""),cooker.getPizza().getName(),cooker.getPizza().getOrderId()));
                        System.out.println("Перший етап завершено!");

                        Thread.sleep(times[1] * 1000);
                        cooker.checkAndPauseIfNeeded();
                        cooker.getPizza().nextStatus();
                        logger.update(cooker.getPizza());
                        sendpizzaDtoData(new PizzaDataDTO(cooker.getPizza().getState().getClass().getName().replaceAll("kpp.project.pizza.statuses.",""),cooker.getPizza().getName(),cooker.getPizza().getOrderId()));
                        System.out.println("Другий етап завершено!");

                        Thread.sleep(times[2] * 1000);
                        cooker.checkAndPauseIfNeeded();
                        cooker.getPizza().nextStatus();
                        logger.update(cooker.getPizza());
                        sendpizzaDtoData(new PizzaDataDTO(cooker.getPizza().getState().getClass().getName().replaceAll("kpp.project.pizza.statuses.",""),cooker.getPizza().getName(),cooker.getPizza().getOrderId()));
                        System.out.println("Третій етап завершено!");

                        Thread.sleep(times[3] * 1000);
                        cooker.checkAndPauseIfNeeded();
                        cooker.getPizza().nextStatus();
                        logger.update(cooker.getPizza());
                        sendpizzaDtoData(new PizzaDataDTO(cooker.getPizza().getState().getClass().getName().replaceAll("kpp.project.pizza.statuses.",""),cooker.getPizza().getName(),cooker.getPizza().getOrderId()));
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
