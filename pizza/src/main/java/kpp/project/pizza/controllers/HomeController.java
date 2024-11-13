package kpp.project.pizza.controllers;
import com.fasterxml.jackson.databind.ObjectMapper;
import kpp.project.pizza.models.Drink;
import kpp.project.pizza.models.Pizza;
import kpp.project.pizza.models.Pizzeria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "http://localhost:3000")
public class HomeController {
    private final ObjectMapper objectMapper = new ObjectMapper();

    @PostMapping
    public Map<String, String> processRequest(@RequestBody Map<String, Object> requestData) {
        try {
            List<Drink> drinks = objectMapper.convertValue(requestData.get("drinks"), List.class);
            List<Pizza> pizzas = objectMapper.convertValue(requestData.get("pizzas"), List.class);

            Pizzeria.getInstance().getMenu().setMenu(pizzas, drinks);

            Map<String, Object> data = (Map<String, Object>) requestData.get("data");
            if (data != null) {
                String choosedCashRegisters = (String) data.get("choosedCashRegisters");
                String choosedCooks = (String) data.get("choosedCooks");
                String choosedKitchenMode = (String) data.get("choosedKitchenMode");

                Integer choosedCashRegistersInt = (choosedCashRegisters != null && !choosedCashRegisters.isEmpty())
                        ? Integer.parseInt(choosedCashRegisters) : null;
                Integer choosedCooksInt = (choosedCooks != null && !choosedCooks.isEmpty())
                        ? Integer.parseInt(choosedCooks) : null;

                Pizzeria.getInstance().setEmployees(choosedCooksInt);
                Pizzeria.getInstance().setCashiers(choosedCashRegistersInt);

                System.out.println(Pizzeria.getInstance().getCashiers().toString());
                System.out.println(Pizzeria.getInstance().getEmployees().toString());
/*                System.out.println(choosedCooks);
                System.out.println(choosedKitchenMode);*/
            }

            Map<String, String> response = new HashMap<>();
            response.put("email", "johndoe@example.com");
            return response;

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Error processing request data", e);
        }
    }
}
