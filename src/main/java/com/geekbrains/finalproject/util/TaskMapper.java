package com.geekbrains.finalproject.util;

import com.geekbrains.finalproject.entities.Task;
import com.geekbrains.finalproject.entities.dtos.TaskModifyDTO;
import com.geekbrains.finalproject.exceptions.ResourceNotFoundException;
import com.geekbrains.finalproject.services.ProjectService;
import com.geekbrains.finalproject.services.TaskService;
import com.geekbrains.finalproject.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.security.Principal;
import java.util.ArrayList;

@Component
@AllArgsConstructor
public class TaskMapper {
    private UserService userService;
    private ProjectService projectService;
    private TaskService taskService;

    public Task createTask(TaskModifyDTO taskModifyDTO, Principal user){
        Task task = new Task();
        task.setUsers(new ArrayList<>());
        task.getUsers().add(userService.findByUsername(user.getName()).orElse(null));
        return convertToTask(taskModifyDTO, task, true);
    }

    private Task convertToTask(TaskModifyDTO taskModifyDTO, Task task, boolean isCreate) {
        task.setProject(projectService.findById(taskModifyDTO.getProjectId()));
        if(isCreate) {
            task.setCreatedTime(taskModifyDTO.getCreatedTime());
        }
        task.setDescription(taskModifyDTO.getDescription());
        task.setPriority(taskModifyDTO.getPriority());
        task.setStatus(taskModifyDTO.getStatus());
        task.setTitle(taskModifyDTO.getTitle());
        return task;
    }

    public Task modifyTask(TaskModifyDTO taskModifyDTO){
        if (!taskService.existsById(taskModifyDTO.getId())) {
            throw new ResourceNotFoundException("Task with id: " + taskModifyDTO.getId() + " doesn't exists");
        }
        Task task = taskService.findById(taskModifyDTO.getId());
        return convertToTask(taskModifyDTO, task, false);
    }
}
