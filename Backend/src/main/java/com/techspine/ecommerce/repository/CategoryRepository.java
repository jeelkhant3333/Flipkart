package com.techspine.ecommerce.repository;

import com.techspine.ecommerce.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface CategoryRepository extends JpaRepository<Category,Long> {
    Category findByName(String category);
    @Query("Select c from Category c Where c.name= :name And c.parentCategory.name= :parentCategoryName")
    Category findByNameAndParent(@Param("name") String name, @Param("parentCategoryName") String parentCategoryName);

}
