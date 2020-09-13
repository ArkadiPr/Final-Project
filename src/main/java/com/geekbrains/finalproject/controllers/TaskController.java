package com.geekbrains.finalproject.controllers;

import com.geekbrains.finalproject.entities.Task;
import com.geekbrains.finalproject.entities.User;
import com.geekbrains.finalproject.entities.dtos.TaskDto;
import com.geekbrains.finalproject.entities.dtos.TaskModifyDTO;
import com.geekbrains.finalproject.exceptions.ResourceNotFoundException;
import com.geekbrains.finalproject.services.ProjectService;
import com.geekbrains.finalproject.services.TaskService;
import com.geekbrains.finalproject.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/tasks")
@AllArgsConstructor
public class TaskController {
    private TaskService taskService;
    private UserService userService;
    private ProjectService projectService;


    @GetMapping
    public List<Task> getAllTasks() {
        return taskService.findAll();
    }

    @GetMapping("/{id}")
    public Task getTaskById(@PathVariable Long id) {
        return taskService.findById(id);
    }

    @PostMapping(consumes = "application/json", produces = "application/json")
    @ResponseStatus(HttpStatus.CREATED)
    public Task createNewTask(@RequestBody Task task) {
        if (task.getId() != null) {
            task.setId(null);
        }
        return taskService.saveOrUpdate(task);
    }

    @PutMapping(consumes = "application/json", produces = "application/json")
    public Task modifyTask(@RequestBody TaskModifyDTO taskModifyDTO) {
        if (!taskService.existsById(taskModifyDTO.getId())) {
            throw new ResourceNotFoundException("Task with id: " + taskModifyDTO.getId() + " doesn't exists");
        }
        Task task=taskService.findById(taskModifyDTO.getId());
        task.setProject(projectService.findById(taskModifyDTO.getProjectId()));
        task.setCreatedTime(taskModifyDTO.getCreatedTime());
        task.setDescription(taskModifyDTO.getDescription());
        task.setPriority(taskModifyDTO.getPriority());
        task.setStatus(taskModifyDTO.getStatus());
        task.setTitle(taskModifyDTO.getTitle());
        return taskService.saveOrUpdate(task);
    }

    @PutMapping("/executor")
    public Task modifyTaskAddExecutor(@RequestBody TaskDto taskDto) {
        User user=userService.findByUsername(taskDto.getUsername()).orElse(null);
        Task task=taskService.findById(taskDto.getId());
        if(user!=null){
            task.getUsers().add(user);
            //user.getTasks().add(task);
        }
        return taskService.saveOrUpdate(task);
    }


    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Long id) {
        taskService.deleteById(id);
    }
}
