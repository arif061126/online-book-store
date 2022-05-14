package com.onlinebookstore.repository;

import com.onlinebookstore.entity.BookCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;


//@Repository //no need for rest repository
@RepositoryRestResource(collectionResourceRel = "bookCategories", path = "book-category")  //to change the endpoint of url
public interface BookCategoryRepository extends JpaRepository<BookCategory, Long> {
}