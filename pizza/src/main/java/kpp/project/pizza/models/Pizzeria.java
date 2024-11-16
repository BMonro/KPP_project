package kpp.project.pizza.models;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

public class Pizzeria {
    // Статична змінна, яка зберігає єдиний екземпляр класу
    private static volatile Pizzeria instance;

    private List<Cooker> employees;
    private List<Cashier> cashiers;
    private List<Order> orders;
    private Menu menu;
    private Kitchen kitchen;

    // Приватний конструктор для заборони створення об'єктів класу ззовні
    private Pizzeria() {
        menu = new Menu();
        employees = new ArrayList<>();
        cashiers = new ArrayList<>();
        orders = new LinkedList<>();
        kitchen = new Kitchen();
    }

    public Kitchen getKitchen() {
        return kitchen;
    }

    // Публічний метод для отримання екземпляра класу (Singleton)
    public static Pizzeria getInstance() {
        if (instance == null) {
            synchronized (Pizzeria.class) {
                if (instance == null) {
                    instance = new Pizzeria();
                }
            }
        }
        return instance;
    }

    // Геттер для employees
    public List<Cooker> getEmployees() {
        return employees;
    }

    // Сетер для employees
    public void setEmployees(int num) {
        List<Cooker> cookers = new ArrayList<>();
        for (int i = 0; i<num; i++) {
            Cooker cooc = new Cooker("Name "+i);
            cookers.add(cooc);
        }
        this.employees = cookers;
    }

    // Геттер для cashiers
    public List<Cashier> getCashiers() {
        return cashiers;
    }

    // Сетер для cashiers
    public void setCashiers(int num) {
        List<Cashier> cashiers = new ArrayList<>();
        for (int i = 0; i<num; i++) {
            Cashier cashier = new Cashier(i);
            cashiers.add(cashier);
        }
        this.cashiers = cashiers;
    }

    // Геттер для orders
    public List<Order> getOrders() {
        return orders;
    }

    // Сетер для orders
    public void addOrder(Order order) {
        for(Pizza pizza:order.getPizzas()){
            kitchen.addPizza(pizza);
        }
        this.orders.add(order);
    }

    // Геттер для menu
    public Menu getMenu() {
        return menu;
    }

    // Сетер для menu
    public void setMenu(Menu menu) {
        this.menu = menu;
    }
}