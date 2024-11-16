package kpp.project.pizza.models;


import kpp.project.pizza.models.statuses.IPizzaStatus;

import java.io.Serializable;
import java.util.*;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

public class Pizza implements Cloneable, Serializable {
    private int orderId;
    // Поле для зберігання назви
    private String name;

    // Поле для зберігання інгредієнтів
    private List<String> ingredients;

    // Поле для зберігання розміру
    private String size;

    // Поле для зберігання ціни
    private double price;

    private final List<Observer> observers = new ArrayList<>();

    // Поле для зберігання стану
    private IPizzaStatus state;
    public Pizza(){}
    public Pizza(String name, String size, double price, int cookingTime, int orderId) {
        this.name = name;
        this.size = size;
        this.price = price;
        this.cookingTime = cookingTime;
        this.orderId = orderId;
    }

    // Поле для зберігання часу приготування
    private int cookingTime;



    public int getOrderId() {return orderId;}
    // Геттер для назви
    public String getName() {
        return name;
    }

    // Сетер для назви
    public void setName(String name) {
        this.name = name;
    }
    public void nextStatus(){
        state.next(this);
    }
    // Геттер для інгредієнтів
    public List<String> getIngredients() {
        return ingredients;
    }

    // Сетер для інгредієнтів
    public void setIngredients(List<String> ingredients) {
        this.ingredients = ingredients;
    }

    // Геттер для розміру
    public String getSize() {
        return size;
    }

    // Сетер для розміру
    public void setSize(String size) {
        this.size = size;
    }

    // Геттер для ціни
    public double getPrice() {
        return price;
    }

    // Сетер для ціни
    public void setPrice(double price) {
        this.price = price;
    }

    // Геттер для стану
    public IPizzaStatus getState() {
        return state;
    }

    // Сетер для стану
    public void setState(IPizzaStatus state) {
        this.state = state;
    }
    // Геттер для часу приготування
    public int getCookingTime() {
        return cookingTime;
    }

    // Сетер для часу приготування
    public void setCookingTime(int cookingTime) {
        this.cookingTime = cookingTime;
    }

    // Метод для редагування інгредієнтів
    public void editIngredients() {
        // Логіка редагування інгредієнтів
    }
    public void addObserver(Observer observer) {
        observers.add(observer);
    }

    private void notifyObservers() {
        for (Observer observer : observers) {
            observer.update(this);
        }
    }

    // Метод для клонування об'єкта
    @Override
    public Pizza clone() {
        try {
            return (Pizza) super.clone();
        } catch (CloneNotSupportedException e) {
            e.printStackTrace();
            return null;
        }
    }
    @Override
    public String toString() {
        return "Pizza {" +
                "name='" + name + '\'' +
                ", size='" + size + '\'' +
                ", price=" + price +
                ", state=" + (state != null ? state.toString() : "N/A") +
                ", cookingTime=" + cookingTime +
                '}';
    }
}
