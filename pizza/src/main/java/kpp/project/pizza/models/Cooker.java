package kpp.project.pizza.models;

import kpp.project.pizza.sockets.WebSocketPauseHandler;

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
        if (random.nextInt(100) < 3) { // 3% шанс зупинки
            stopWork();
        }
    }

    // Метод для відправки даних про кухаря на фронт
    private void sendCookerData(String cookerName, String status) {
        try {
            String json = "{ \"name\": \"" + cookerName + "\", \"status\": \"" + status + "\" }";
            WebSocketPauseHandler.sendMessageToAll(json);
            System.out.println("Sent customer data: " + json);
        } catch (Exception e) {
            e.printStackTrace();
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
