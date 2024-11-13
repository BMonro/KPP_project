package kpp.project.pizza.models;

import java.util.Date;

public class Receipt {

    // Поле для зберігання замовлення
    public Order order;

    // Поле для зберігання загальної ціни
    public double totalPrice;

    // Поле для зберігання дати
    public Date date;

    // Поле для зберігання ідентифікатора чеку
    public int receiptID;

    // Поле для зберігання статусу
    public String status;

    public double calculateTotalPrice(Order order){

        return 0;
    }
}
