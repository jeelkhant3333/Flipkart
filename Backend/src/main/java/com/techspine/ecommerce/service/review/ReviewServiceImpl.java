package com.techspine.ecommerce.service.review;

import com.techspine.ecommerce.entity.Product;
import com.techspine.ecommerce.entity.Reviews;
import com.techspine.ecommerce.entity.User;
import com.techspine.ecommerce.exception.ProductException;
import com.techspine.ecommerce.repository.ReviewRepository;
import com.techspine.ecommerce.request.ReviewRequest;
import com.techspine.ecommerce.service.product.ProductService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReviewServiceImpl implements ReviewService{

    private ReviewRepository reviewRepository;
    private ProductService productService;

    public ReviewServiceImpl(ReviewRepository reviewRepository, ProductService productService) {
        this.reviewRepository = reviewRepository;
        this.productService = productService;
    }


    @Override
    @Transactional
    public Reviews createReviews(ReviewRequest reviewsRequest, User user) throws ProductException {
        Product product = productService.findProductById(reviewsRequest.getId());
        Reviews reviews = new Reviews();
        reviews.setUser(user);
        reviews.setProduct(product);
        reviews.setCreatedAt(LocalDateTime.now());
        reviews.setReview(reviewsRequest.getReview());
        return reviewRepository.save(reviews);
    }

    @Override
    public List<Reviews> getProductsReviews(Long productId) {
        return reviewRepository.getAllReviews(productId);
    }
}
