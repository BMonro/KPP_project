package kpp.project.pizza.models;

import com.google.gson.Gson;
import kpp.project.pizza.models.statuses.IPizzaStatus;
import kpp.project.pizza.models.statuses.Ordered;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.List;
import java.util.Queue;
import java.util.Random;

public class Kitchen  extends Thread{
    private static final int BREAK_TIME = 30000;
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
                            sendCustomerData(pizza1.getState(), pizza1.getName(), pizza1.getOrderId());
                            Cooker cooker1 = employees.get(i);
                            Thread.sleep((int)(time*1000));
                            if(isSomethingBreak()){
                                sendCookerDataSmtBreak(cooker);
                                Thread.sleep(BREAK_TIME);
                                sendCookerDataRepair(cooker);
                            }
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
    private static boolean isSomethingBreak(){
        Random random = new Random();
        int randomValue = random.nextInt(101);
        System.out.println("Generated value: " + randomValue);
        return (randomValue > 0 && randomValue < 5);
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
                        sendCustomerData(cooker.getPizza().getState(), cooker.getPizza().getName(), cooker.getPizza().getOrderId());
                        System.out.println("Перший етап завершено!");
                        if(isSomethingBreak()){
                            sendCookerDataSmtBreak(cooker);
                            Thread.sleep(BREAK_TIME);
                            sendCookerDataRepair(cooker);
                        }
                        Thread.sleep(times[1] * 1000);
                        cooker.getPizza().nextStatus();
                        sendCustomerData(cooker.getPizza().getState(), cooker.getPizza().getName(), cooker.getPizza().getOrderId());
                        System.out.println("Другий етап завершено!");
                        if(isSomethingBreak()){
                            sendCookerDataSmtBreak(cooker);
                            Thread.sleep(BREAK_TIME);
                            sendCookerDataRepair(cooker);
                        }

                        Thread.sleep(times[2] * 1000);
                        cooker.getPizza().nextStatus();
                        sendCustomerData(cooker.getPizza().getState(), cooker.getPizza().getName(), cooker.getPizza().getOrderId());
                        System.out.println("Третій етап завершено!");
                        if(isSomethingBreak()){
                            sendCookerDataSmtBreak(cooker);
                            Thread.sleep(BREAK_TIME);
                            sendCookerDataRepair(cooker);
                        }

                        Thread.sleep(times[3] * 1000);
                        cooker.getPizza().nextStatus();
                        sendCustomerData(cooker.getPizza().getState(), cooker.getPizza().getName(), cooker.getPizza().getOrderId());
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
    private static void sendCustomerData(IPizzaStatus status, String nameOfPizza, int orderId) {
        try {
            // Створюємо об'єкт DTO для передачі
            PizzaDataDTO data = new PizzaDataDTO(status.toString(), nameOfPizza, orderId);

            // Серіалізуємо об'єкт DTO в JSON
            Gson gson = new Gson();
            String json = gson.toJson(data);

            // Створюємо об'єкт HttpClient
            HttpClient client = HttpClient.newHttpClient();

            // Створюємо запит POST для відправки даних
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create("http://localhost:3000/pizza/update")) // Реальний URL
                    .header("Content-Type", "application/json") // JSON-заголовок
                    .POST(HttpRequest.BodyPublishers.ofString(json)) // Тіло запиту
                    .build();

            // Виконуємо запит
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            // Перевіряємо відповідь
            if (response.statusCode() == 200) {
                System.out.println("Pizza data successfully sent.");
                System.out.println("Response Body: " + response.body());
            } else {
                System.out.println("Failed to send pizza data. Response code: " + response.statusCode());
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    private static void sendCookerDataSmtBreak(Cooker cooker) {
        try {
            Gson gson = new Gson();
            String json = gson.toJson(cooker.getName());
            HttpClient client = HttpClient.newHttpClient();

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create("http://localhost:3000/cooker/break"))
                    .header("Content-Type",   "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(json))
                    .build();
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            if (response.statusCode() == 200) {
                System.out.println("Pizza data successfully sent.");
                System.out.println("Response Body: " + response.body());
            } else {
                System.out.println("Failed to send pizza data. Response code: " + response.statusCode());
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private static void sendCookerDataRepair(Cooker cooker) {
        try {
            Gson gson = new Gson();
            String json = gson.toJson(cooker.getName());
            HttpClient client = HttpClient.newHttpClient();

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create("http://localhost:3000/cooker/repair"))
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(json))
                    .build();
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            if (response.statusCode() == 200) {
                System.out.println("Pizza data successfully sent.");
                System.out.println("Response Body: " + response.body());
            } else {
                System.out.println("Failed to send pizza data. Response code: " + response.statusCode());
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
