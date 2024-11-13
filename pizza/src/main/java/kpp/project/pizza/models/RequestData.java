package kpp.project.pizza.models;

import java.util.List;

public class RequestData {
    private List<Drink> drinks;
    private List<Pizza> pizzas;
    private String allySupportsCache;
    private String choosedCashRegisters;
    private String choosedCooks;
    private String choosedKitchenMode;
    private String choosedStrategy;

    // Геттер для drinks
    public List<Drink> getDrinks() {
        return drinks;
    }

    // Сетер для drinks
    public void setDrinks(List<Drink> drinks) {
        this.drinks = drinks;
    }

    // Геттер для pizzas
    public List<Pizza> getPizzas() {
        return pizzas;
    }

    // Сетер для pizzas
    public void setPizzas(List<Pizza> pizzas) {
        this.pizzas = pizzas;
    }

    // Геттер для allySupportsCache
    public String getAllySupportsCache() {
        return allySupportsCache;
    }

    // Сетер для allySupportsCache
    public void setAllySupportsCache(String allySupportsCache) {
        this.allySupportsCache = allySupportsCache;
    }

    // Геттер для choosedCashRegisters
    public String getChoosedCashRegisters() {
        return choosedCashRegisters;
    }

    // Сетер для choosedCashRegisters
    public void setChoosedCashRegisters(String choosedCashRegisters) {
        this.choosedCashRegisters = choosedCashRegisters;
    }

    // Геттер для choosedCooks
    public String getChoosedCooks() {
        return choosedCooks;
    }

    // Сетер для choosedCooks
    public void setChoosedCooks(String choosedCooks) {
        this.choosedCooks = choosedCooks;
    }

    // Геттер для choosedKitchenMode
    public String getChoosedKitchenMode() {
        return choosedKitchenMode;
    }

    // Сетер для choosedKitchenMode
    public void setChoosedKitchenMode(String choosedKitchenMode) {
        this.choosedKitchenMode = choosedKitchenMode;
    }

    // Геттер для choosedStrategy
    public String getChoosedStrategy() {
        return choosedStrategy;
    }

    // Сетер для choosedStrategy
    public void setChoosedStrategy(String choosedStrategy) {
        this.choosedStrategy = choosedStrategy;
    }
}
