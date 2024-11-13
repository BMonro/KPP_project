package kpp.project.pizza.controllers;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import kpp.project.pizza.models.Drink;
import kpp.project.pizza.models.Pizza;
import kpp.project.pizza.models.Pizzeria;
import kpp.project.pizza.models.RequestData;
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

    @PostMapping
    public Map<String, String> processRequest(@RequestBody Map<String, Map<String, Object>> requestData) {
        // Отримання даних за ключами
        Gson gson = new Gson();
        List<Drink> drinks = gson.fromJson((String) requestData.get("data").get("Drinks"), new TypeToken<List<Drink>>(){}.getType());
        List<Pizza> pizzas = gson.fromJson((String) requestData.get("data").get("Pizzas"), new TypeToken<List<Drink>>(){}.getType());

        Pizzeria.getInstance().getMenu().setMenu(pizzas,drinks);

//        List<Drink> drinks = (List<Drink>) requestData.get("data").get("Drinks");
//        List<Pizza> pizzas = (List<Pizza>) requestData.get("data").get("Pizzas");
//        Pizzeria.getInstance().getMenu().setMenu(pizzas,drinks);

//        String choosedCashRegisters = (String) requestData.get("data").get("choosedCashRegisters");
//        String choosedCooks = (String) requestData.get("data").get("choosedCooks");
//        String choosedKitchenMode = (String) requestData.get("data").get("choosedKitchenMode");
//
//        System.out.println(choosedCashRegisters);
//
//
//        System.out.println(choosedCooks);
//        System.out.println(choosedKitchenMode);
//        System.out.println(requestData);

        Map<String, String> response = new HashMap<>();
        response.put("email", "johndoe@example.com");
        return response;
    }
}
