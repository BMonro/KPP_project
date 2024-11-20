package kpp.project.pizza.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import kpp.project.pizza.models.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/pizza-status")
@CrossOrigin(origins = "http://localhost:3000")
public class PizzaStatusController {
    // sendpizzaDtoData(new PizzaDataDTO(cooker.getPizza().getState().getClass().getName(),cooker.getPizza().getName(),cooker.getPizza().getOrderId()));
    @GetMapping
    public ResponseEntity<List<PizzaDataDTO>> getAllPizzaStatusRequest() {
        List<Order> orders = Pizzeria.getInstance().getOrders();
        List<PizzaDataDTO> items = orders.stream()
                .flatMap(order -> order.getPizzas().stream())
                .map(pizza ->  new PizzaDataDTO(pizza.getState().getClass().getName(), pizza.getName(), pizza.getOrderId()))
                .collect(Collectors.toList());
        return ResponseEntity.ok(items);
    }
}
