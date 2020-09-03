package com.geekbrains.finalproject.controllers;


import com.geekbrains.finalproject.entities.Document;
import com.geekbrains.finalproject.services.DocumentService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/documents")
@AllArgsConstructor
public class DocumentController {

    @Autowired
    private DocumentService documentService;

    @GetMapping
    public List<Document> getAllDocuments() {
        return documentService.findAll();
    }
}
