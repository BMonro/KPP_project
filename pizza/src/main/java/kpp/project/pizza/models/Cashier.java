package kpp.project.pizza.models;

import java.util.LinkedList;
import java.util.Queue;

public class Cashier {
    private int id;
    private Queue<Customer> customers;

    public Cashier(int id) {
        this.id = id;
        customers = new LinkedList<>();
    }

    public int getId() {
        return id;
    }

    public void addCustomer(Customer customer) {
        customers.add(customer);
    }

    public int getCustomersQueue() {
        return customers != null ? customers.size() : 0;
    }

    public void workWithNextCustomer() {

    }
}
