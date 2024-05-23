package com.techspine.ecommerce.service.rating;

import com.techspine.ecommerce.entity.Rating;
import com.techspine.ecommerce.entity.User;
import com.techspine.ecommerce.exception.ProductException;
import com.techspine.ecommerce.request.RatingRequest;
import jdk.dynalink.linker.LinkerServices;

import java.util.List;

public interface RatingService {

    Rating createRating(RatingRequest ratingRequest , User user) throws ProductException;
    List<Rating> getProductsRating(Long productId);
}
