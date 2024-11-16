package kpp.project.pizza.models;

public class Drink implements Cloneable {
    // Поле для зберігання назви
    private String name;

    // Поле для зберігання розміру
    private String size;
    private int orderID;

    // Поле для зберігання ціни
    private double price;
    public Drink(){}
    public Drink(String name, String size, double price, int orderID) {
        this.name = name;
        this.size = size;
        this.price = price;
        this.orderID = orderID;
    }

    // Геттер для назви
    public String getName() {
        return name;
    }
    public int getOrderID() {return orderID;}

    // Сетер для назви
    public void setName(String name) {
        this.name = name;
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

    // Метод для клонування об'єкта
    @Override
    public Drink clone() {
        try {
            return (Drink) super.clone();
        } catch (CloneNotSupportedException e) {
            e.printStackTrace();
            return null;
        }
    }
    @Override
    public String toString() {
        return "Drink{" +
                "name='" + name + '\'' +
                ", size='" + size + '\'' +
                ", price=" + price +
                '}';
    }

}
