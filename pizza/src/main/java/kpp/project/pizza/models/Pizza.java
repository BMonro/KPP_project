package kpp.project.pizza.models;

import javax.swing.plaf.nimbus.State;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

public class Pizza implements Cloneable, Serializable {
    // Поле для зберігання назви
    public String name;

    // Поле для зберігання інгредієнтів
    public List<String> ingredients;

    // Поле для зберігання розміру
    public String size;

    // Поле для зберігання ціни
    public double price;

    // Поле для зберігання стану
    public State state;

    // Поле для зберігання часу приготування
    public Date cookingTime;

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
