package com.geekbrains.finalproject.repositories;

import com.geekbrains.finalproject.entities.Project;
import com.geekbrains.finalproject.entities.dtos.ProjectDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {

    @Query(value = "select new com.geekbrains.finalproject.entities.dtos.ProjectDTO(p.id, p.projectName) from Project p where p.user.id=:id")
    List<ProjectDTO> findAllByOwnerId(@Param("id") Long id);

    @Query(value = "select distinct new com.geekbrains.finalproject.entities.dtos.ProjectDTO(p.id, p.projectName)" +
            " from Project p inner join Task t on t.project.id = p.id " +
    "inner join t.users u on u.id=:id")
    List<ProjectDTO> findAllProjectsByExecutorsName(@Param("id") Long id);

}