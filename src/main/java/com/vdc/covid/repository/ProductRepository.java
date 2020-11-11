package com.vdc.covid.repository;

import com.vdc.covid.domain.Product;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Product entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("select product from Product product where product.shop.user.login = ?#{principal.username}")
    List<Product> findByUserIsCurrentUser();

}
