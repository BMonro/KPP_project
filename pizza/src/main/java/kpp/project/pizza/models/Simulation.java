package kpp.project.pizza.models;

import com.google.gson.Gson;
import kpp.project.pizza.models.statuses.IPizzaStatus;
import kpp.project.pizza.models.strategies.IPizzaStrategy;
import org.apache.el.stream.Stream;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

public class Simulation extends Thread{
    private static IPizzaStrategy strategy;
    private static ScheduledExecutorService scheduler;
    public Simulation(IPizzaStrategy strategy) {
        this.strategy = strategy;
        scheduler = Executors.newScheduledThreadPool(1);
    }

    @Override
    public void run() {
        generateCustomers();
    }

    public void generateCustomers() {
        int deley = strategy.generateDelays();
        scheduler.scheduleAtFixedRate(() -> {

            Order order = new Order();
            List<Pizza> pizzas = new ArrayList<>();
            List<Pizza> allPizzas = Pizzeria.getInstance().getMenu().getPizzas();
            List<Drink> drinks = new ArrayList<>();
            List<Drink> allDrinks = Pizzeria.getInstance().getMenu().getDrinks();
            int pizzaCount = generateCount();
            for (int i = 0; i < pizzaCount; i++) {
                Pizza pizza = generateOrdersPart(allPizzas);
                if (pizza != null) {
                    pizzas.add(new Pizza(pizza.getName(), pizza.getSize(), pizza.getPrice(), pizza.getCookingTime(), order.getOrderID()));
                }
            }
            order.setPizzas(pizzas);

            int drinksCount = generateCount();
            for (int i = 0; i < drinksCount; i++) {
                Drink drink = generateOrdersPart(allDrinks);
                if (drink != null) {
                    drinks.add(new Drink(drink.getName(), drink.getSize(), drink.getPrice(), order.getOrderID()));
                }
            }
            order.setDrinks(drinks);

            List<Cashier> cashiers = new ArrayList<>();
            int cashierID = chooseCashier(cashiers);

            Customer customer = new Customer();
            customer.setIdCashier(String.valueOf(cashierID));
            customer.setOrder(order);
        }, 0, deley, TimeUnit.SECONDS);
    }

    public static int generateCount() {
        int maxCount = 3;
        Random random = new Random();
        return random.nextInt(maxCount) + 1;
    }

    public <T> T generateOrdersPart(List<T> ordersPartList) {
        if (ordersPartList.isEmpty()) {
            return null;
        }
        int ordersPartTypeCount = ordersPartList.size();
        Random random = new Random();
        int randomOrderPartIndex = random.nextInt(ordersPartTypeCount);
        return ordersPartList.get(randomOrderPartIndex);
    }

    public int chooseCashier(List<Cashier> cashierList) {
        int cashierCount = cashierList.size();
        int minQueueIndex = 0;
        int minQueueSize = Integer.MAX_VALUE;

        for (int i = 0; i < cashierCount; i++) {
            int currentQueueSize = cashierList.get(i).getCustomersQueue();
            if (currentQueueSize < minQueueSize) {
                minQueueSize = currentQueueSize;
                minQueueIndex = i;
            }
        }
        return cashierList.get(minQueueIndex).getId();
    }

    public static void sendCustomerData(IPizzaStatus status, String nameOfPizza, int orderId) {
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
                    .uri(URI.create("http://localhost:3001/new/customer")) // Реальний URL
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

}
