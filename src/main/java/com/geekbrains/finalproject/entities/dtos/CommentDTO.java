package com.geekbrains.finalproject.entities.dtos;

import com.geekbrains.finalproject.entities.Task;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@AllArgsConstructor
@Data
public class CommentDTO {
    private String fromUser;
    private String toUser;
    private Task task;
    private String text;
    private LocalDateTime createdTime;
}
