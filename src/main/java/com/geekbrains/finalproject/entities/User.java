package com.geekbrains.finalproject.entities;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Cascade;

import javax.persistence.*;
import java.util.Collection;
import java.util.List;

@NoArgsConstructor
@Entity
@Data
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "username" , unique = true)
    private String username;

    @Column(name = "password")
    private String password;

    public User(String username, String password) {
        this.username = username;
        this.password = password;
    }

    @ManyToMany
    @JoinTable(name = "users_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Collection<Role> roles;

    @ManyToMany
    @JoinTable(name = "users_tasks",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "task_id"))
    private List<Task> tasks;

    @OneToMany(mappedBy = "user")
    @Cascade(org.hibernate.annotations.CascadeType.ALL)
    private List<Project> projects;
}