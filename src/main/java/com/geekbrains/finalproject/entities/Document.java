package com.geekbrains.finalproject.entities;


import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "documents")
@Data
public class Document {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "text")
    private String text;


}
