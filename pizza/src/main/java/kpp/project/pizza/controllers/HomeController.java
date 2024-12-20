package kpp.project.pizza.controllers;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import kpp.project.pizza.models.*;
import kpp.project.pizza.strategies.IPizzaStrategy;
import kpp.project.pizza.strategies.RandomStrategy;
import kpp.project.pizza.strategies.RushHourStrategy;
import kpp.project.pizza.strategies.StandartStrategy;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.lang.reflect.Type;
@RestController
@RequestMapping("/")
@CrossOrigin(origins = "http://localhost:3000")
public class HomeController {
    private final ObjectMapper objectMapper = new ObjectMapper();
    private boolean isCreated = false;

    @PostMapping
    public Map<String, String> processRequest(@RequestBody Map<String, Object> requestData) {
        try {
            if (!isCreated) {isCreated = true;
            Map<String, Object> data = (Map<String, Object>) requestData.get("data");
            Gson gson = new Gson();

            // Оголошуємо тип для списку Drink
            Type listType1 = new TypeToken<List<Drink>>() {}.getType();
            //System.out.println("Parsed Drinks: " + listType1);
            Type listType2 = new TypeToken<List<Pizza>>() {}.getType();
            //System.out.println("Parsed Pizzas: " + listType1);

            // Парсинг JSON у список об'єктів Drink
            List<Drink> drinks = gson.fromJson((String)data.get("Drinks"), listType1);
            List<Pizza> pizzas = gson.fromJson((String)data.get("Pizzas"), listType2);

            System.out.println(data.get("Drinks"));
            System.out.println(data.get("Pizzas"));
            Pizzeria.getInstance().getMenu().setMenu(pizzas, drinks);

            if (data != null) {
                String choosedCashRegisters = ((String) data.get("choosedCashRegisters")).replaceAll("\"", "");
                String choosedCooks = ((String) data.get("choosedCooks")).replaceAll("\"", "");
                String choosedKitchenMode = ((String) data.get("choosedKitchenMode")).replaceAll("\"", "");
                String strategyNumber = ((String) data.get("choosedKitchenMode")).replaceAll("\"", "");

                Integer choosedCashRegistersInt = (choosedCashRegisters != null && !choosedCashRegisters.isEmpty())
                        ? Integer.parseInt(choosedCashRegisters) : null;
                Integer choosedCooksInt = (choosedCooks != null && !choosedCooks.isEmpty())
                        ? Integer.parseInt(choosedCooks) : null;

                Integer intKitchenMode = 0;
                if (choosedKitchenMode.equals("1 cook - 1 pizza")) {
                    intKitchenMode = 2;
                } else if (choosedKitchenMode.equals("1 cook - 1 option")) {
                    intKitchenMode = 1;
                }

                System.out.println("Int mode " + intKitchenMode);
                Pizzeria.getInstance().getKitchen().setMode(intKitchenMode);
                Pizzeria.getInstance().setEmployees(choosedCooksInt);
                Pizzeria.getInstance().setCashiers(choosedCashRegistersInt);

                IPizzaStrategy strategy = switch (strategyNumber) {
                    case "Strategy 1" -> new StandartStrategy();
                    case "Strategy 2" -> new RushHourStrategy();
                    case "Strategy 3" -> new RandomStrategy();
                    default -> new StandartStrategy();
                };
                Simulation simulation = new Simulation(strategy);
                simulation.start();
                Kitchen kitchen = Pizzeria.getInstance().getKitchen();
                if (!kitchen.isRunning()) {
                    kitchen.start();
                }

                Map<String, String> response = new HashMap<>();
                response.put("status", "OK");
                return response;
                }
            }

            Map<String, String> response = new HashMap<>();
            response.put("status", "FAIL");
            return response;

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Error processing request data", e);
        }
    }
}
