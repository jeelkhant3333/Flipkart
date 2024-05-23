package com.techspine.ecommerce.service.rating;

import com.techspine.ecommerce.entity.Product;
import com.techspine.ecommerce.entity.Rating;
import com.techspine.ecommerce.entity.User;
import com.techspine.ecommerce.exception.ProductException;
import com.techspine.ecommerce.repository.RatingRepository;
import com.techspine.ecommerce.request.RatingRequest;
import com.techspine.ecommerce.service.product.ProductService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
@Service
public class RatingServiceImpl implements RatingService{

    private final RatingRepository ratingRepository;
    private final ProductService productService;

    public RatingServiceImpl(RatingRepository ratingRepository, ProductService productService) {
        this.ratingRepository = ratingRepository;
        this.productService = productService;
    }

    @Override
    @Transactional
    public Rating createRating(RatingRequest ratingRequest, User user) throws ProductException {
        Product product = productService.findProductById(ratingRequest.getId());
        Rating rating = new Rating();
        rating.setProduct(product);
        rating.setUser(user);
        rating.setRating(ratingRequest.getRating());
        rating.setCreateAt(LocalDateTime.now());

        return ratingRepository.save(rating);
    }

    @Override
    public List<Rating> getProductsRating(Long productId) {

        return ratingRepository.getAllRatings(productId);
    }
}
