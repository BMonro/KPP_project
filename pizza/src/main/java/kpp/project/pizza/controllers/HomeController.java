package kpp.project.pizza.controllers;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import kpp.project.pizza.models.Drink;
import kpp.project.pizza.models.Pizza;
import kpp.project.pizza.models.Pizzeria;
import kpp.project.pizza.models.Simulation;
import kpp.project.pizza.models.strategies.IPizzaStrategy;
import kpp.project.pizza.models.strategies.RandomStrategy;
import kpp.project.pizza.models.strategies.RushHourStrategy;
import kpp.project.pizza.models.strategies.StandartStrategy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    @PostMapping
    public Map<String, String> processRequest(@RequestBody Map<String, Object> requestData) {
        try {
            Map<String, Object> data = (Map<String, Object>) requestData.get("data");
            Gson gson = new Gson();

            // Оголошуємо тип для списку Drink
            Type listType1 = new TypeToken<List<Drink>>() {}.getType();
            Type listType2 = new TypeToken<List<Pizza>>() {}.getType();

            // Парсинг JSON у список об'єктів Drink
            List<Drink> drinks = gson.fromJson((String)data.get("Drinks"), listType1);
            List<Pizza> pizzas = gson.fromJson((String)data.get("Pizzas"), listType2);
            System.out.println(data.get("Pizzas"));
            Pizzeria.getInstance().getMenu().setMenu(pizzas, drinks);

            if (data != null) {
                String choosedCashRegisters = (String) data.get("choosedCashRegisters");
                String choosedCooks = (String) data.get("choosedCooks");
                String choosedKitchenMode = (String) data.get("choosedKitchenMode");
                String strategyNumber = (String) data.get("choosedStrategy");

                Integer choosedCashRegistersInt = (choosedCashRegisters != null && !choosedCashRegisters.isEmpty())
                        ? Integer.parseInt(choosedCashRegisters) : null;
                Integer choosedCooksInt = (choosedCooks != null && !choosedCooks.isEmpty())
                        ? Integer.parseInt(choosedCooks) : null;

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
                Map<String, String> response = new HashMap<>();
                response.put("status", "OK");
                return response;
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
