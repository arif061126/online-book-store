package com.onlinebookstore.config;

import com.onlinebookstore.entity.Book;
import com.onlinebookstore.entity.BookCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import javax.persistence.EntityManager;
import javax.persistence.metamodel.Type;

/**
 * to expose the id in the json response
 */
@Configuration
public class RepositoryConfig implements RepositoryRestConfigurer {
    @Autowired
    private EntityManager entityManager;

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        /*
        config.exposeIdsFor(Book.class);
        config.exposeIdsFor(BookCategory.class);
         */
        //alternative way:
        config.exposeIdsFor(entityManager
                .getMetamodel()
                .getEntities()
                .stream()
                .map(Type::getJavaType)
                .toArray(Class[]::new)
        );

        //config.setDefaultPageSize(5); //to limit the item in the page

        //RepositoryRestConfigurer.super.configureRepositoryRestConfiguration(config, cors);
    }
}