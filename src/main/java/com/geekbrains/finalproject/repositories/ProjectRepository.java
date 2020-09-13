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

    @Query(value = "select new com.geekbrains.finalproject.entities.dtos.ProjectDTO(p.id, p.projectName) from Project p where p.user.username=:username")
    List<ProjectDTO> findAllByOwnerId(@Param("username") String username);

    @Query(value = "select distinct new com.geekbrains.finalproject.entities.dtos.ProjectDTO(p.id, p.projectName)" +
            " from Project p inner join Task t on t.project.id = p.id " +
    "inner join t.users u where u.username=:username")
    List<ProjectDTO> findAllProjectsByExecutorsName(@Param("username") String username);
}