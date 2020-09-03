package com.geekbrains.finalproject.repositories;

import com.geekbrains.finalproject.entities.Document;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface DocumentRepository extends JpaRepository<Document, Long>{
}
