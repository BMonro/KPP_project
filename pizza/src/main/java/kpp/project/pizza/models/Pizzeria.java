package kpp.project.pizza.models;

import java.util.ArrayList;
import java.util.List;

public class Pizzeria {
    // Статична змінна, яка зберігає єдиний екземпляр класу
    private static volatile Pizzeria instance;

    private List<Cooker> employees;
    private List<Cashier> cashiers;
    private List<Order> orders;
    private Menu menu;

    // Приватний конструктор для заборони створення об'єктів класу ззовні
    private Pizzeria() {
        menu = new Menu();
        employees = new ArrayList<>();
        cashiers = new ArrayList<>();
        orders = new ArrayList<>();
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
    public void setEmployees(List<Cooker> employees) {
        this.employees = employees;
    }

    // Геттер для cashiers
    public List<Cashier> getCashiers() {
        return cashiers;
    }

    // Сетер для cashiers
    public void setCashiers(List<Cashier> cashiers) {
        this.cashiers = cashiers;
    }

    // Геттер для orders
    public List<Order> getOrders() {
        return orders;
    }

    // Сетер для orders
    public void setOrders(List<Order> orders) {
        this.orders = orders;
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
