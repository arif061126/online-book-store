package com.onlinebookstore.repository;

import com.onlinebookstore.entity.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.web.bind.annotation.CrossOrigin;


//@Repository //no need for rest repository
@CrossOrigin("*")
public interface BookRepository extends JpaRepository<Book, Long> {
    @RestResource(path = "categoryId") //to change end point url; by default it was /search/findByCategoryId
    Page<Book> findByCategoryId(@Param("id") Long id, Pageable pageable);
}