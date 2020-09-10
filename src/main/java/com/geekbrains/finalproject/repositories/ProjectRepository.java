package com.geekbrains.finalproject.repositories;

import com.geekbrains.finalproject.entities.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {

    @Query("select * from projects  where user_id=:id")
    List<Project> findAllByUserName(@Param("id")Long id);
}