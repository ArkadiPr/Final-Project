package com.geekbrains.finalproject.controllers;

import com.geekbrains.finalproject.entities.Task;
import com.geekbrains.finalproject.entities.User;
import com.geekbrains.finalproject.entities.dtos.TaskDto;
import com.geekbrains.finalproject.exceptions.ResourceNotFoundException;
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
    public Task modifyTask(@RequestBody Task task) {
        if (!taskService.existsById(task.getId())) {
            throw new ResourceNotFoundException("Task with id: " + task.getId() + " doesn't exists");
        }
        return taskService.saveOrUpdate(task);
    }

    @GetMapping("/{username}")
    public Task modifyTaskAddExecutor(@PathVariable TaskDto taskDto) {
        User user=userService.findByUsername(taskDto.getUsername()).orElse(null);
        Task task=taskService.findById(taskDto.getId());
        if(user!=null){
            task.getUsers().add(user);
        }
        return task;
    }


    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Long id) {
        taskService.deleteById(id);
    }
}
