package com.geekbrains.finalproject.repositories;

import com.geekbrains.finalproject.entities.Comment;
import com.geekbrains.finalproject.entities.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository  extends JpaRepository<Comment, Long> {
}
