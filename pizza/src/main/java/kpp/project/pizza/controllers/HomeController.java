package kpp.project.pizza.controllers;
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

    @PostMapping
    public ResponseEntity<String> processRequest(@RequestBody Map<String, Object> requestData) {
        // Отримання даних за ключами
        List<Drink> drinks = (List<Drink>) requestData.get("drinks");
        List<Pizza> pizzas = (List<Pizza>) requestData.get("pizzas");
        String choosedCashRegisters = (String) requestData.get("choosedCashRegisters");
        Pizzeria.getInstance().getMenu().setMenu(pizzas,drinks);
        System.out.println(Pizzeria.getInstance());
        // Логіка обробки даних

        return ResponseEntity.ok("Data processed successfully!");
    }
}
