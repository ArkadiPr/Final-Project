package com.geekbrains.finalproject.services;

import com.geekbrains.finalproject.entities.Document;
import com.geekbrains.finalproject.repositories.DocumentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DocumentService {

    private DocumentRepository documentRepository;

    public DocumentService(DocumentRepository documentRepository) {
        this.documentRepository = documentRepository;
    }


    public List<Document> findAll(){
        return documentRepository.findAll();
    }
}
