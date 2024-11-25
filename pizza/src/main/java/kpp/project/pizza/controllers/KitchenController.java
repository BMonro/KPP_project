package kpp.project.pizza.controllers;


import com.fasterxml.jackson.databind.ObjectMapper;
import kpp.project.pizza.models.Order;
import kpp.project.pizza.models.Pizza;
import kpp.project.pizza.models.Pizzeria;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/kitchen")
@CrossOrigin(origins = "http://localhost:3000")
public class KitchenController {
    private final ObjectMapper objectMapper = new ObjectMapper();
    @PostMapping
    public Map<String, String> newOrder(@RequestBody Map<String, Object> requestData) {
        Order order = objectMapper.convertValue(requestData.get("data"), Order.class);
        System.out.println("New order: " + requestData);
        Pizzeria.getInstance().addOrder(order);
        Map<String, String> response = new HashMap<>();
        response.put("status", "OK");
        return response;
    }
}
