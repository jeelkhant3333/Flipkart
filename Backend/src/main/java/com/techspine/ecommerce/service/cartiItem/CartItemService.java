package com.techspine.ecommerce.service.cartiItem;

import com.techspine.ecommerce.entity.Cart;
import com.techspine.ecommerce.entity.CartItem;
import com.techspine.ecommerce.entity.Product;
import com.techspine.ecommerce.exception.CartitemException;
import com.techspine.ecommerce.exception.UserException;

public interface CartItemService {

    CartItem createCartItem(CartItem cartItem);

    CartItem updateCartItem(Long userId, Long id, CartItem cartitem) throws CartitemException, UserException;

    CartItem isCartItemExist(Cart cart, Product product, String size, Long userId);

    void removeCartItem(Long userId, Long cartItemId) throws CartitemException, UserException;

    CartItem findCartItemById(Long cartItemId) throws CartitemException;
}
