package com.vdc.covid.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of {@link ShopSearchRepository} to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class ShopSearchRepositoryMockConfiguration {

    @MockBean
    private ShopSearchRepository mockShopSearchRepository;

}
