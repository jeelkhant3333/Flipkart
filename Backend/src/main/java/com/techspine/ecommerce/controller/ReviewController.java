package com.techspine.ecommerce.controller;

import com.techspine.ecommerce.entity.Reviews;
import com.techspine.ecommerce.entity.User;
import com.techspine.ecommerce.exception.ProductException;
import com.techspine.ecommerce.exception.UserException;
import com.techspine.ecommerce.request.ReviewRequest;
import com.techspine.ecommerce.service.review.ReviewService;
import com.techspine.ecommerce.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    @Autowired
    private UserService userService;
    @Autowired
    private ReviewService reviewService;

    @PostMapping("/create")
    public ResponseEntity<Reviews> createReview(@RequestBody ReviewRequest req,
                                                @RequestHeader("Authorization") String jwt) throws UserException, ProductException {
        User user=userService.findUserProfileByJwt(jwt);
        Reviews reviews=reviewService.createReviews(req,user);
        return new ResponseEntity<>(reviews, HttpStatus.CREATED);
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<List<Reviews>> getProductReviews(@PathVariable Long productId) throws UserException,ProductException{
        List<Reviews> reviews=reviewService.getProductsReviews(productId);
        return new ResponseEntity<>(reviews,HttpStatus.CREATED);
    }
}