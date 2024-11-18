package kpp.project.pizza.models;

import java.net.http.*;
import java.net.URI;
import java.util.List;
import java.util.Random;

public class Cooker {
    private String name;
    private Pizza pizza;
    private boolean isWorking = true; // Статус роботи кухаря

    public Cooker(String name) {
        this.name = name;
    }

    // Метод для оновлення статусу з можливістю затримки
    public void editStatus(String status, int delay) {
        try {
            Thread.sleep(delay * 1000); // Затримка
            System.out.println("Cooker " + name + " updated status to: " + status);
            sendCookerData(name, status); // Відправка даних на фронт
        } catch (InterruptedException e) {
            System.err.println("Interrupted while updating status: " + e.getMessage());
        }
    }

    // Метод для зупинки роботи
    public void stopWork() {
        isWorking = false;
        System.out.println("Cooker " + name + " is on a technical pause.");
        sendCookerData(name, "Technical Pause");
        try {
            Thread.sleep(30 * 1000); // Затримка на 30 секунд
        } catch (InterruptedException e) {
            System.err.println("Interrupted during technical pause: " + e.getMessage());
        }
        isWorking = true;
        System.out.println("Cooker " + name + " resumed work.");
        sendCookerData(name, "Resumed Work");
    }

    // Метод для отримання наступного замовлення з наданого списку
    public void getNextOrder(List<Order> orders) {
        if (!orders.isEmpty() && isWorking) {
            Order nextOrder = orders.remove(0); // Взяти перше замовлення
            System.out.println("Cooker " + name + " took the order: " + nextOrder.getOrderID());
            sendCookerData(name, "Took Order: " + nextOrder.getOrderID());
        }
    }

    // Метод для перевірки і зупинки роботи рандомно
    public void checkAndPauseIfNeeded() {
        Random random = new Random();
        if (random.nextInt(10) < 3) { // 30% шанс зупинки
            stopWork();
        }
    }

    // Метод для відправки даних про кухаря на фронт
    private void sendCookerData(String cookerName, String status) {
        try {
            HttpClient client = HttpClient.newHttpClient();
            String json = "{ \"name\": \"" + cookerName + "\", \"status\": \"" + status + "\" }";
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create("http://localhost:3001/cooker/status"))
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(json))
                    .build();

            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            if (response.statusCode() == 200) {
                System.out.println("Cooker data sent successfully: " + response.body());
            } else {
                System.err.println("Failed to send cooker data. Response code: " + response.statusCode());
            }
        } catch (Exception e) {
            System.err.println("Error sending cooker data: " + e.getMessage());
        }
    }
    public String getName() {
        return  this.name;
    }

    public void setName(String name) {
        this.name = name;
    }
    public Pizza getPizza() {
        return this.pizza;
    }

    public void setPizza(Pizza pizza) {
        this.pizza = pizza;
    }
}
