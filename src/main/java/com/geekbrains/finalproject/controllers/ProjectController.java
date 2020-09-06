package com.geekbrains.finalproject.controllers;

import com.geekbrains.finalproject.entities.Project;
import com.geekbrains.finalproject.exceptions.ResourceNotFoundException;
import com.geekbrains.finalproject.services.ProjectService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/projects")
@AllArgsConstructor
public class ProjectController {
    private ProjectService projectService;

    @GetMapping
    public List<Project> getAllProjects() {
        return projectService.findAll();
    }

    @GetMapping("/{id}")
    public Project getProjectById(@PathVariable Long id) {
        return projectService.findById(id);
    }

    @PostMapping(consumes = "application/json", produces = "application/json")
    @ResponseStatus(HttpStatus.CREATED)
    public Project createNewProject(@RequestBody Project project) {
        if (project.getId() != null) {
            project.setId(null);
        }
        return projectService.saveOrUpdate(project);
    }

    @PutMapping(consumes = "application/json", produces = "application/json")
    public Project modifyProject(@RequestBody Project project) {
        if (!projectService.existsById(project.getId())) {
            throw new ResourceNotFoundException("Project with id: " + project.getId() + " doesn't exists");
        }
        return projectService.saveOrUpdate(project);
    }
    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Long id) {
        projectService.deleteById(id);
    }
}
