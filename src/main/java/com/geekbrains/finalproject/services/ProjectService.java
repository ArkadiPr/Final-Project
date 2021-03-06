package com.geekbrains.finalproject.services;

import com.geekbrains.finalproject.entities.Project;
import com.geekbrains.finalproject.entities.dtos.ProjectDTO;
import com.geekbrains.finalproject.exceptions.ResourceNotFoundException;
import com.geekbrains.finalproject.repositories.ProjectRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ProjectService {
    private ProjectRepository projectRepository;

    public Project findById(Long id) {
        return projectRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Project with id: " + id + " not found"));
    }

    public void deleteById(Long id) {
        projectRepository.deleteById(id);
    }

    public boolean existsById(Long id) {
        return projectRepository.existsById(id);
    }

    public Project saveOrUpdate(Project project) {
        return projectRepository.save(project);
    }

    public List<ProjectDTO> findAllByOwnerId(String username){
        return projectRepository.findAllByOwnerId(username);
    }

    public List<ProjectDTO> findAllProjectsByExecutorsName(String username){
        return projectRepository.findAllProjectsByExecutorsName(username);
    }
}
