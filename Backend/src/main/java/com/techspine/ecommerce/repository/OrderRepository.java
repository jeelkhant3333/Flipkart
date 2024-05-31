package com.techspine.ecommerce.repository;

import com.techspine.ecommerce.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order,Long> {

//    @Query("SELECT o FROM Order o WHERE o.user.id = :userId AND (o.status = 'PLACED' OR o.status = 'CONFIRMED' OR o.status = 'SHIPPED' OR o.status = 'DELIVERED')")
//    List<Order> getUsersOrders(@Param("userId") Long userId);


    @Query("SELECT o FROM Order o WHERE o.user.id = :userId")
    List<Order> getUsersOrders(@Param("userId") Long userId);
}