package kpp.project.pizza.models;

import java.util.Queue;

public class Cashier {
    private int id;
    private Queue<Customer> customers;

    public Cashier(int id) {
        this.id = id;
    }

    public void workWithNextCustomer() {

    }
}
