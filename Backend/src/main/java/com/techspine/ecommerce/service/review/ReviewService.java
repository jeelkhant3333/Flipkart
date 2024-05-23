package com.techspine.ecommerce.service.review;

import com.techspine.ecommerce.entity.Reviews;
import com.techspine.ecommerce.entity.Reviews;
import com.techspine.ecommerce.entity.User;
import com.techspine.ecommerce.exception.ProductException;
import com.techspine.ecommerce.request.ReviewRequest;

import java.util.List;

public interface ReviewService {
    Reviews createReviews(ReviewRequest reviewsRequest , User user) throws ProductException;
    List<Reviews> getProductsReviews(Long productId);
}
