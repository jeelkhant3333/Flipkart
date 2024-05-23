package com.techspine.ecommerce.repository;

import com.techspine.ecommerce.entity.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RatingRepository extends JpaRepository<Rating,Long> {

    @Query("SELECT r FROM Rating r WHERE r.product.id = :productId")
    List<Rating> getAllRatings(@Param("productId") Long productId);

}
