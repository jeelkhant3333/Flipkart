package com.techspine.ecommerce.controller;

import com.techspine.ecommerce.entity.Cart;
import com.techspine.ecommerce.entity.User;
import com.techspine.ecommerce.exception.ProductException;
import com.techspine.ecommerce.exception.UserException;
import com.techspine.ecommerce.request.AddItemRequest;
import com.techspine.ecommerce.response.ApiResponse;
import com.techspine.ecommerce.service.cart.CartService;
import com.techspine.ecommerce.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;
    @Autowired
    private UserService userService;

    @GetMapping("/")
    public ResponseEntity<Cart> findUserCart(@RequestHeader("Authorization") String jwt) throws UserException {
//        System.out.println("hello");
        User user = userService.findUserProfileByJwt(jwt);
//        System.out.println("user "+user);
        Cart cart = cartService.findUserCart(user.getId());
//        System.out.println("cart " + cart);

        return new ResponseEntity<Cart>(cart, HttpStatus.OK);
    }

    @PutMapping("/add")
    public ResponseEntity<ApiResponse> addItemToCart(@RequestBody AddItemRequest request , @RequestHeader("Authorization") String jwt) throws UserException , ProductException{

        User user = userService.findUserProfileByJwt(jwt);
        cartService.addCartItem(user.getId(), request);
        ApiResponse response = new ApiResponse("Item Added" , true);

        return new ResponseEntity<ApiResponse>(response,HttpStatus.OK);
    }


}
