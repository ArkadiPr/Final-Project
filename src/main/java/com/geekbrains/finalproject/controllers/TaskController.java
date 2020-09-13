package com.geekbrains.finalproject.controllers;

import com.geekbrains.finalproject.entities.Task;
import com.geekbrains.finalproject.entities.User;
import com.geekbrains.finalproject.entities.dtos.TaskDTO;
import com.geekbrains.finalproject.entities.dtos.TaskModifyDTO;
import com.geekbrains.finalproject.services.TaskService;
import com.geekbrains.finalproject.services.UserService;
import com.geekbrains.finalproject.util.TaskMapper;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/tasks")
@AllArgsConstructor
public class TaskController {
    private TaskService taskService;
    private UserService userService;
    private TaskMapper createTaskMapper;


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
    public Task createNewTask(@RequestBody TaskModifyDTO taskModifyDTO, Principal user) {
        Task task = createTaskMapper.createTask(taskModifyDTO, user);
        return taskService.saveOrUpdate(task);
    }

    @PutMapping(consumes = "application/json", produces = "application/json")
    public Task modifyTask(@RequestBody TaskModifyDTO taskModifyDTO) {
        Task task = createTaskMapper.modifyTask(taskModifyDTO);
        return taskService.saveOrUpdate(task);
    }

    @PutMapping("/executor")
    public Task modifyTaskAddExecutor(@RequestBody TaskDTO taskDto) {
        User user = userService.findByUsername(taskDto.getUsername()).orElse(null);
        Task task = taskService.findById(taskDto.getId());
        if(user != null){
            task.getUsers().add(user);
        }
        return taskService.saveOrUpdate(task);
    }


    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Long id) {
        taskService.deleteById(id);
    }
}
