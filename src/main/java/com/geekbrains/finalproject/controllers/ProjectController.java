package com.geekbrains.finalproject.controllers;

import com.geekbrains.finalproject.entities.Project;
import com.geekbrains.finalproject.entities.Task;
import com.geekbrains.finalproject.entities.dtos.ProjectDTO;
import com.geekbrains.finalproject.exceptions.ResourceNotFoundException;
import com.geekbrains.finalproject.services.ProjectService;
import com.geekbrains.finalproject.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/projects")
@AllArgsConstructor
public class ProjectController {
    private ProjectService projectService;
    private UserService userService;

    @GetMapping("/{id}")
    public Project getProjectById(@PathVariable Long id) {
        return projectService.findById(id);
    }

    @GetMapping("/owners")
    public List<ProjectDTO> getProjectByOwnerId(Principal user) {
        return projectService.findAllByOwnerId(user.getName());
    }

    @GetMapping("/executors")
    public List<ProjectDTO> getProjectByUserName(Principal user) { return  projectService.findAllProjectsByExecutorsName(user.getName());}

    @PostMapping(consumes = "application/json", produces = "application/json")
    @ResponseStatus(HttpStatus.CREATED)
    public Project createNewProject(@RequestBody Project project, Principal user) {
        if (project.getId() != null) {
            project.setId(null);
        }
        project.setUser(userService.findByUsername(user.getName()).orElse(null));
        return projectService.saveOrUpdate(project);
    }

    @PutMapping(consumes = "application/json", produces = "application/json")
    public Project modifyProject(@RequestBody Project project) {
        if (!projectService.existsById(project.getId())) {
            throw new ResourceNotFoundException("Project with id: " + project.getId() + " doesn't exists");
        }
        List<Task> tasks = project.getTasks();
        for(Task task : tasks){
            task.setProject(project);
        }
        project.setTasks(tasks);
        return projectService.saveOrUpdate(project);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Long id) {
        projectService.deleteById(id);
    }
}
