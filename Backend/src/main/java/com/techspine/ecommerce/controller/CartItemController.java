package com.techspine.ecommerce.controller;

import com.techspine.ecommerce.entity.CartItem;
import com.techspine.ecommerce.entity.User;
import com.techspine.ecommerce.exception.CartitemException;
import com.techspine.ecommerce.exception.ProductException;
import com.techspine.ecommerce.exception.UserException;
import com.techspine.ecommerce.request.UpdateCartItemRequest;
import com.techspine.ecommerce.response.ApiResponse;
import com.techspine.ecommerce.service.cart.CartService;
import com.techspine.ecommerce.service.cartiItem.CartItemService;
import com.techspine.ecommerce.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart_items")
public class CartItemController {

    @Autowired
    private CartItemService cartItemService;
    @Autowired
    private UserService userService;
    @Autowired
    private CartService cartService;

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> removeCartItem(@RequestHeader("Authorization") String jwt,
                                                      @PathVariable Long id) throws UserException, CartitemException, ProductException {
        User user = userService.findUserProfileByJwt(jwt);
        CartItem item = cartItemService.findCartItemById(id);
//        System.out.println("cart item found   " + item.getId());
        cartService.removeCartItem(user.getId(), item.getId());
        ApiResponse res = new ApiResponse();
//        res.setMessage("Cart item deleted successfully.");
        res.setStatus(true);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CartItem> updateCartItem(
            @PathVariable Long id, @RequestHeader("Authorization") String jwt,
            @RequestBody UpdateCartItemRequest updateRequest) throws UserException, CartitemException {
        User user = userService.findUserProfileByJwt(jwt);
        cartItemService.updateCartItem(user.getId(), id, updateRequest.getQuantity());
        CartItem cartItem = cartItemService.findCartItemById(id);
        return new ResponseEntity<>(cartItem, HttpStatus.OK);
    }

}