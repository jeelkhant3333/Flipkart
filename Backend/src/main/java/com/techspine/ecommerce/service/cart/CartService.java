package com.techspine.ecommerce.service.cart;

import com.techspine.ecommerce.entity.Cart;
import com.techspine.ecommerce.entity.User;
import com.techspine.ecommerce.exception.ProductException;
import com.techspine.ecommerce.request.AddItemRequest;

public interface CartService {

     Cart createCart(User user);

     String addCartItem(Long userId, AddItemRequest req) throws ProductException;

     Cart findUserCart(Long userId);
}
