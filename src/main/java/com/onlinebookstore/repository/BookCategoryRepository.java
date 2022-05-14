package com.onlinebookstore.repository;

import com.onlinebookstore.entity.BookCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

//@Repository //no need for rest repository
public interface BookCategoryRepository extends JpaRepository<BookCategory, Long> {
}
