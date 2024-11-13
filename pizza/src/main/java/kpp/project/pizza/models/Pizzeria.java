package kpp.project.pizza.models;

import java.util.List;

public class Pizzeria {
    // Статична змінна, яка зберігає єдиний екземпляр класу
    private static volatile Pizzeria instance;

    private List<Cooker> employees;
    private List<Cashier> cashiers;
    private List<Order> orders;
    private Menu menu;

    // Приватний конструктор для заборони створення об'єктів класу ззовні
    public Pizzeria() {}

    // Публічний метод для отримання екземпляра класу
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
}
