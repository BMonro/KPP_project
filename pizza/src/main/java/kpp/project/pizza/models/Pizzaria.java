package kpp.project.pizza.models;

import java.util.List;

public class Pizzaria {
    // Статична змінна, яка зберігає єдиний екземпляр класу
    private static volatile Pizzaria instance;

    private List<Cooker> employees;
    private List<Cashier> cashiers;
    private List<Order> orders;
    private Menu menu;

    // Приватний конструктор для заборони створення об'єктів класу ззовні
    private Pizzaria() {}

    // Публічний метод для отримання екземпляра класу
    public static Pizzaria getInstance() {
        if (instance == null) {
            synchronized (Pizzaria.class) {
                if (instance == null) {
                    instance = new Pizzaria();
                }
            }
        }
        return instance;
    }
}
