package com.geekbrains.finalproject.controllers;

import com.geekbrains.finalproject.entities.Comment;
import com.geekbrains.finalproject.entities.dtos.CommentDTO;
import com.geekbrains.finalproject.services.CommentService;
import com.geekbrains.finalproject.util.CommentMapper;
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

    private CommentMapper commentMapper;

    @GetMapping
    public List<Comment> getAllComments() {
        return commentService.findAll();
    }

    @PostMapping(consumes = "application/json", produces = "application/json")
    @ResponseStatus(HttpStatus.CREATED)
    public Comment createNewComment(@RequestBody CommentDTO commentDTO) {
        Comment convertedComment = commentMapper.convertToComment(commentDTO);
        return commentService.saveOrUpdate(convertedComment);
    }

    @GetMapping("/{id}")
    public Comment getCommentById(@PathVariable Long id) {
        return commentService.findById(id);
    }

    @DeleteMapping("/{id}")
    public String deleteById(@PathVariable Long id) {
        commentService.deleteById(id);
        return "Comment was deleted successfully!";
    }
}
