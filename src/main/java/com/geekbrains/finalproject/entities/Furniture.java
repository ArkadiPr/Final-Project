package com.geekbrains.finalproject.entities;


import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "furniture")
@Data
public class Furniture {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "price")
    private Long price;


}
