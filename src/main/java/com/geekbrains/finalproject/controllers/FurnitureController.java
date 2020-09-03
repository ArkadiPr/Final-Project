package com.geekbrains.finalproject.controllers;


import com.geekbrains.finalproject.entities.Furniture;
import com.geekbrains.finalproject.services.FurnitureService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/furniture")
@AllArgsConstructor
public class FurnitureController {

    @Autowired
    private FurnitureService furnitureService;

    @GetMapping
    public List<Furniture> getAllFurniture() {
        return furnitureService.findAll();
    }
}
