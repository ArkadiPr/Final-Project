package com.geekbrains.finalproject.util;

import com.geekbrains.finalproject.entities.Comment;
import com.geekbrains.finalproject.entities.User;
import com.geekbrains.finalproject.entities.dtos.CommentDTO;
import com.geekbrains.finalproject.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class CommentMapper {
    private UserService userService;

    public Comment convertToComment(CommentDTO commentDTO) {
        User fromUser = userService.findByUsername(commentDTO.getFromUser())
                .orElseThrow(()-> new UsernameNotFoundException("User with username " + commentDTO.getFromUser() + " wasn't found." ));
        Comment comment = new Comment();
        comment.setFromUser(fromUser);
        comment.setTask(commentDTO.getTask());
        comment.setText(commentDTO.getText());
        comment.setToUser(commentDTO.getToUser());
        comment.setCreatedTime(commentDTO.getCreatedTime());
        return comment;
    }
}
