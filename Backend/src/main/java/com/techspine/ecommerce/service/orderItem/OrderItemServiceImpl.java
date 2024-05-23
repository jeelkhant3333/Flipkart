package com.techspine.ecommerce.service.orderItem;

import com.techspine.ecommerce.entity.OrderItem;
import com.techspine.ecommerce.repository.OrderItemRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class OrderItemServiceImpl implements OrderItemService{

    private final OrderItemRepository orderItemRepository;

    public OrderItemServiceImpl(OrderItemRepository orderItemRepository){
        this.orderItemRepository=orderItemRepository;
    }
    @Override
    @Transactional
    public OrderItem createOrderItem(OrderItem orderItem) {
        return orderItemRepository.save(orderItem);
    }
}
