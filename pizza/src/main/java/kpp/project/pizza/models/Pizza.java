package kpp.project.pizza.models;

import javax.swing.plaf.nimbus.State;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

public class Pizza implements Cloneable, Serializable {
    // Поле для зберігання назви
    private String name;

    // Поле для зберігання інгредієнтів
    private List<String> ingredients;

    // Поле для зберігання розміру
    private String size;

    // Поле для зберігання ціни
    private double price;

    // Поле для зберігання стану
    private State state;

    // Поле для зберігання часу приготування
    private Date cookingTime;

    // Геттер для назви
    public String getName() {
        return name;
    }

    // Сетер для назви
    public void setName(String name) {
        this.name = name;
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
    public State getState() {
        return state;
    }

    // Сетер для стану
    public void setState(State state) {
        this.state = state;
    }

    // Геттер для часу приготування
    public Date getCookingTime() {
        return cookingTime;
    }

    // Сетер для часу приготування
    public void setCookingTime(Date cookingTime) {
        this.cookingTime = cookingTime;
    }

    // Метод для редагування інгредієнтів
    public void editIngredients() {
        // Логіка редагування інгредієнтів
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
}
