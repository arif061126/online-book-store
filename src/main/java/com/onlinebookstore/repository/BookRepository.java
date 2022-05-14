package com.onlinebookstore.repository;

import com.onlinebookstore.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

//@Repository //no need for rest repository
public interface BookRepository extends JpaRepository<Book, Long> {
}