package com.geekbrains.finalproject.services;

import com.geekbrains.finalproject.entities.Comment;
import com.geekbrains.finalproject.exceptions.ResourceNotFoundException;
import com.geekbrains.finalproject.repositories.CommentRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class CommentService {

    private CommentRepository commentRepository;

    public Comment saveOrUpdate(Comment comment) {
        return commentRepository.save(comment);
    }

    public List<Comment> findAll() { return commentRepository.findAll(); }

    public Comment findById(Long id) {
        return commentRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Comment with id: " + id + " not found"));
    }


}
