package com.geekbrains.finalproject.entities.dtos;

import com.geekbrains.finalproject.entities.Task;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Collection;
import java.util.List;

@AllArgsConstructor
@Data
public class ProjectDTO {
    private Long id;
    private String projectName;


}
