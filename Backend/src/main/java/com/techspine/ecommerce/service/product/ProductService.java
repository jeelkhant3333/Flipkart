package com.techspine.ecommerce.service.product;

import com.techspine.ecommerce.entity.Product;
import com.techspine.ecommerce.exception.ProductException;
import com.techspine.ecommerce.request.CreateProductRequest;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.data.domain.Page;


import java.util.List;

public interface ProductService {

    Product createProduct(CreateProductRequest request);
    String deleteProduct(Long productId) throws ProductException;
    Product updateProduct(Long productId , Product product) throws ProductException;
    Product findProductById(Long productId) throws ProductException;
    List<Product> findProductByCategory(String category);
    Page<Product> getAllProducts(String category, List<String> colors, List<String> size, Integer minPrice, Integer maxPrice, Integer minDiscount, String sort, String stock, Integer pageNumber,Integer pageSize);
    List<Product> findAllProducts();
}
