package com.techspine.ecommerce.service.order;

import com.techspine.ecommerce.entity.Address;
import com.techspine.ecommerce.entity.Order;
import com.techspine.ecommerce.entity.User;
import com.techspine.ecommerce.exception.OrderException;

import java.util.List;


public interface OrderService {

    Order createOrder(User user, Address shippingAddress);

    Order findOrderById(Long orderId) throws OrderException;

    List<Order> usersOrderHistory(Long userId);

    Order placedOrder(Long orderId) throws OrderException;

    Order confirmedOrder(Long orderId) throws OrderException;

    Order shippedOrder(Long orderId) throws OrderException;

    Order deliveredOrder(Long orderId) throws OrderException;

    Order cancledOrder(Long orderId) throws OrderException;

    List<Order> getAllOrders();

    void deleteOrder(Long orderId) throws OrderException;
}
