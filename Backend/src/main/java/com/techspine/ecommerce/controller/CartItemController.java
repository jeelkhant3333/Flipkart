package com.techspine.ecommerce.controller;

import com.techspine.ecommerce.entity.User;
import com.techspine.ecommerce.exception.CartitemException;
import com.techspine.ecommerce.exception.UserException;
import com.techspine.ecommerce.response.ApiResponse;
import com.techspine.ecommerce.service.cartiItem.CartItemService;
import com.techspine.ecommerce.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;

public class CartItemController {


    @Autowired
    private CartItemService cartItemService;
    @Autowired
    private UserService userService;

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> removeCartItem(@RequestHeader("Authorization") String jwt,
                                                      @PathVariable Long id) throws UserException, CartitemException {
        User user=userService.findUserProfileByJwt(jwt);
        cartItemService.removeCartItem(user.getId(), id);

        ApiResponse res=new ApiResponse();
        res.setMessage("Cart item deleted successfully.");
        res.setStatus(true);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }
}
