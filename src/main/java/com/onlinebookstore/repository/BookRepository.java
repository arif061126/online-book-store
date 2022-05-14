package com.onlinebookstore.repository;

import com.onlinebookstore.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

//@Repository //no need for rest repository
@CrossOrigin("*")
public interface BookRepository extends JpaRepository<Book, Long> {
}