package com.vdc.covid.web.rest;

import com.vdc.covid.domain.Shop;
import com.vdc.covid.repository.ShopRepository;
import com.vdc.covid.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.vdc.covid.domain.Shop}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ShopResource {

    private final Logger log = LoggerFactory.getLogger(ShopResource.class);

    private static final String ENTITY_NAME = "shop";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ShopRepository shopRepository;

    public ShopResource(ShopRepository shopRepository) {
        this.shopRepository = shopRepository;
    }

    /**
     * {@code POST  /shops} : Create a new shop.
     *
     * @param shop the shop to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new shop, or with status {@code 400 (Bad Request)} if the shop has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/shops")
    public ResponseEntity<Shop> createShop(@RequestBody Shop shop) throws URISyntaxException {
        log.debug("REST request to save Shop : {}", shop);
        if (shop.getId() != null) {
            throw new BadRequestAlertException("A new shop cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Shop result = shopRepository.save(shop);
        return ResponseEntity.created(new URI("/api/shops/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /shops} : Updates an existing shop.
     *
     * @param shop the shop to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated shop,
     * or with status {@code 400 (Bad Request)} if the shop is not valid,
     * or with status {@code 500 (Internal Server Error)} if the shop couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/shops")
    public ResponseEntity<Shop> updateShop(@RequestBody Shop shop) throws URISyntaxException {
        log.debug("REST request to update Shop : {}", shop);
        if (shop.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Shop result = shopRepository.save(shop);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, shop.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /shops} : get all the shops.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of shops in body.
     */
    @GetMapping("/shops")
    public ResponseEntity<List<Shop>> getAllShops(Pageable pageable) {
        log.debug("REST request to get a page of Shops");
        Page<Shop> page = shopRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /shops/:id} : get the "id" shop.
     *
     * @param id the id of the shop to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the shop, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/shops/{id}")
    public ResponseEntity<Shop> getShop(@PathVariable Long id) {
        log.debug("REST request to get Shop : {}", id);
        Optional<Shop> shop = shopRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(shop);
    }

    /**
     * {@code DELETE  /shops/:id} : delete the "id" shop.
     *
     * @param id the id of the shop to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/shops/{id}")
    public ResponseEntity<Void> deleteShop(@PathVariable Long id) {
        log.debug("REST request to delete Shop : {}", id);
        shopRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
