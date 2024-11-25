package kpp.project.pizza.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import kpp.project.pizza.models.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/orders")
@CrossOrigin(origins = "http://localhost:3000")
public class PizzaStatusController {
    @GetMapping
    public ResponseEntity<List<PizzaDataDTO>> getAllPizzaStatusRequest() {
        List<Order> orders = Pizzeria.getInstance().getOrders();
        List<PizzaDataDTO> items = orders.stream()
                .flatMap(order -> order.getPizzas().stream())
                .map(pizza ->  new PizzaDataDTO(pizza.getState().getClass().getName().replaceAll("kpp.project.pizza.statuses.",""), pizza.getName(), pizza.getOrderId()))
                .collect(Collectors.toList());
        //List<PizzaDataDTO> items = new ArrayList<>();
        /*items.add(new PizzaDataDTO("new", "pizza", 1));
        items.add(new PizzaDataDTO("new", "pizza", 1));
        items.add(new PizzaDataDTO("new", "pizza", 1));
        items.add(new PizzaDataDTO("new", "pizza", 1));*/
        return ResponseEntity.ok(items);
    }
}
