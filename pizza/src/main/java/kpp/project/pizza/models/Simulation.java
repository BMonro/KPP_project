package kpp.project.pizza.models;

import com.google.gson.Gson;
import kpp.project.pizza.models.strategies.IPizzaStrategy;

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

            // Generate random count for pizzas
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

            Customer customer = new Customer();
            customer.setOrder(order);
            sendCustomerData(customer);
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

    public static void sendCustomerData(Customer customer) {
        try {
            // Створюємо об'єкт HttpClient
            HttpClient client = HttpClient.newHttpClient();

            // Серіалізуємо об'єкт Customer в JSON
            Gson gson = new Gson();
            String json = gson.toJson(customer);
            // Створюємо запит POST для відправки даних
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create("http://localhost:3001/new/customer"))  // Заміна на реальний URL
                    .header("Content-Type", "application/json")  // Вказуємо, що передаємо JSON
                    .POST(HttpRequest.BodyPublishers.ofString(json))  // Тіло запиту в форматі JSON
                    .build();

            // Виконуємо запит
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            // Перевіряємо код відповіді
            if (response.statusCode() == 200) {
                System.out.println("Customer data successfully sent.");
                System.out.println("Response Body: " + response.body());
            } else {
                System.out.println("Failed to send customer data. Response code: " + response.statusCode());
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
