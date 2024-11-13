package kpp.project.pizza.models;

public class Drink implements Cloneable {
    // Поле для зберігання назви
    public String name;

    // Поле для зберігання розміру
    public String size;

    // Поле для зберігання ціни
    public double price;

    // Метод для клонування об'єкта
    public Drink clone() {
        try {
            return (Drink) super.clone();
        } catch (CloneNotSupportedException e) {
            e.printStackTrace();
            return null;
        }
    }
}
