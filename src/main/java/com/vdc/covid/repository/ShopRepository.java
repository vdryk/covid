package com.vdc.covid.repository;

import com.vdc.covid.domain.Shop;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Shop entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ShopRepository extends JpaRepository<Shop, Long> {

    @Query("select distinct shop from Shop shop join fetch shop.products  where shop.user.login = ?#{principal.username}")
    List<Shop> findByUserIsCurrentUser();
}
