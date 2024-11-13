package kpp.project.pizza.controllers;
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
        List<Map<String, Object>> drinks = (List<Map<String, Object>>) requestData.get("drinks");
        List<Map<String, Object>> pizzas = (List<Map<String, Object>>) requestData.get("pizzas");
        String choosedCashRegisters = (String) requestData.get("choosedCashRegisters");
        System.out.println(requestData);
        // Логіка обробки даних

        return ResponseEntity.ok("Data processed successfully!");
    }
}
