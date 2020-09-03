package com.geekbrains.finalproject.services;

import com.geekbrains.finalproject.entities.Furniture;
import com.geekbrains.finalproject.repositories.FurnitureRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FurnitureService {

    private FurnitureRepository furnitureRepository;

    public FurnitureService(FurnitureRepository documentRepository) {
        this.furnitureRepository = documentRepository;
    }


    public List<Furniture> findAll(){
        return furnitureRepository.findAll();
    }
}
