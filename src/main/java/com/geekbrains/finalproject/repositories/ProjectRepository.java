package com.geekbrains.finalproject.repositories;

import com.geekbrains.finalproject.entities.Project;
import com.geekbrains.finalproject.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
}