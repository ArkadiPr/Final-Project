package com.geekbrains.finalproject.controllers;

import com.geekbrains.finalproject.entities.Comment;
import com.geekbrains.finalproject.entities.Task;
import com.geekbrains.finalproject.services.CommentService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/comments")
@AllArgsConstructor
public class CommentController {
    private CommentService commentService;

    @GetMapping
    public List<Comment> getAllComments() {
        return commentService.findAll();
    }

    @PostMapping(consumes = "application/json", produces = "application/json")
    @ResponseStatus(HttpStatus.CREATED)
    public Comment createNewComment(@RequestBody Comment comment) {
        if (comment.getId() != null) {
            comment.setId(null);
        }
        return commentService.saveOrUpdate(comment);
    }

    @GetMapping("/{id}")
    public Comment getCommentById(@PathVariable Long id) {
        return commentService.findById(id);
    }
}
