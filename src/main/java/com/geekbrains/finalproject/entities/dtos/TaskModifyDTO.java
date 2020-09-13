package com.geekbrains.finalproject.entities.dtos;

import com.geekbrains.finalproject.entities.Project;
import com.geekbrains.finalproject.entities.Task;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@AllArgsConstructor
@Data
public class TaskModifyDTO {
    private Long id;
    private String title;
    private String description;
    private Task.Status status;
    private Task.Priority priority;
    private LocalDateTime createdTime;
    private Long projectId;

}
