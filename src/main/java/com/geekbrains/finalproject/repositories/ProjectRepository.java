package com.geekbrains.finalproject.repositories;

import com.geekbrains.finalproject.entities.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {

    @Query(value = "select * from projects where user_id=:id", nativeQuery = true)
    List<Project> findAllByUserName(@Param("id")Long id);

    @Query(value = "select distinct * from projects inner join tasks on tasks.project_id = projects.id " +
    "inner join users_tasks on tasks.id = users_tasks.task_id" +
    " inner join users on users.id = users_tasks.user_id where username=:username" , nativeQuery = true)
    List<Project> findAllProjectsByExecutorsName(@Param("username")String username);

}