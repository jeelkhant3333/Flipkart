package com.techspine.ecommerce.controller;


import com.techspine.ecommerce.entity.Address;
import com.techspine.ecommerce.entity.Order;
import com.techspine.ecommerce.entity.User;
import com.techspine.ecommerce.exception.OrderException;
import com.techspine.ecommerce.exception.UserException;
import com.techspine.ecommerce.service.order.OrderService;
import com.techspine.ecommerce.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    public UserService userService;
    @Autowired
    public OrderService orderService;

    @PostMapping("/")
    public ResponseEntity<Order> createOrder(@RequestBody Address shippingAddress,
                                             @RequestHeader("Authorization") String jwt) throws UserException {
        User user=userService.findUserProfileByJwt(jwt);
        Order order=orderService.createOrder(user,shippingAddress);
        return new ResponseEntity<Order>(order, HttpStatus.CREATED);
    }

    @GetMapping("/user")
    public ResponseEntity<List<Order>> usersOrderHistory(@RequestHeader("Authorization") String jwt) throws UserException{
        User user=userService.findUserProfileByJwt(jwt);
        List<Order> orders=orderService.usersOrderHistory(user.getId());
        return new ResponseEntity<>(orders,HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> findOrderById(@PathVariable("id") Long orderId,
                                               @RequestHeader("Authorization") String jwt) throws UserException, OrderException {
        User user=userService.findUserProfileByJwt(jwt);
        Order order=orderService.findOrderById(orderId);

        return new ResponseEntity<Order>(order,HttpStatus.ACCEPTED);
    }
}