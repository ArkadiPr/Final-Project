package com.geekbrains.finalproject.repositories;

import com.geekbrains.finalproject.entities.Furniture;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface FurnitureRepository extends JpaRepository<Furniture, Long>{
}
