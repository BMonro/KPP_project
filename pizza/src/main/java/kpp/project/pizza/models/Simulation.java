package kpp.project.pizza.models;

import com.google.gson.Gson;
import kpp.project.pizza.models.strategies.IPizzaStrategy;

import javax.websocket.Session;
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
        System.out.println("Simulation started");
        int deley = strategy.generateDelays();
        scheduler.scheduleAtFixedRate(() -> {
            System.out.println("Generating customer");
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
            System.out.println(order.getPizzas());
            int drinksCount = generateCount();
            for (int i = 0; i < drinksCount; i++) {
                Drink drink = generateOrdersPart(allDrinks);
                if (drink != null) {
                    drinks.add(new Drink(drink.getName(), drink.getSize(), drink.getPrice(), order.getOrderID()));
                }
            }
            order.setDrinks(drinks);
            System.out.println(order.getDrinks());
            List<Cashier> cashiers = Pizzeria.getInstance().getCashiers();
            int cashierID = chooseCashier(cashiers);
            System.out.println("Cashier ID: " + cashierID);
            Customer customer = new Customer();
            customer.setIdCashier(String.valueOf(cashierID));
            customer.setOrder(order);
            System.out.println(customer);
            //Pizzeria.getInstance().getCashiers().get(cashierID).addCustomer(customer);
            System.out.println(customer);
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

    public static void sendCustomerData(Customer customer) {
        try {
            Gson gson = new Gson();
            String json = gson.toJson(customer);
            WebSocketTextHandler.sendMessageToAll(json);
            System.out.println("Sent customer data: " + json);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }



}
