package kpp.project.pizza.models;

import com.google.gson.Gson;
import kpp.project.pizza.models.strategies.IPizzaStrategy;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
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

    public static void generateCustomers() {
        int deley = strategy.generateDelays();
        scheduler.scheduleAtFixedRate(() -> {
            Order order = new Order();
            Customer customer = new Customer();
            customer.setOrder(order);
            sendCustomerData(customer);
        }, 0, deley, TimeUnit.SECONDS);
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
                    .uri(URI.create("http://localhost:3000/new/customer"))  // Заміна на реальний URL
                    .header("Content-Type", "application/json")  // Вказуємо, що передаємо JSON
                    .POST(HttpRequest.BodyPublishers.ofString(json, StandardCharsets.UTF_8))  // Тіло запиту в форматі JSON
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
