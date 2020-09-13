package com.geekbrains.finalproject.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;


@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tasks")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private Status status;

    @Column(name = "priority")
    @Enumerated(EnumType.STRING)
    private Priority priority;

    @Column(name = "created_at")
    @CreationTimestamp
    private LocalDateTime createdTime;

    @ManyToMany
    @JoinTable(name = "users_tasks",
            joinColumns = @JoinColumn(name = "task_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"))
    private List<User> users;


    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project project;



    @AllArgsConstructor
    @Getter
    public enum Status {
        IS_CREATE("Создана"),
        IN_PROGRESS("В работе"),
        ON_CHECK("Передана на проверку"),
        ON_REWORK("Возвращена на доработку"),
        IS_DONE("Завершена"),
        IS_CANCELED("Отменена");

        private String rus;
    }

    @AllArgsConstructor
    @Getter
    public enum Priority {
        IN_THE_PLANS("В планах"),
        VERY_LOW("Очень низкий"),
        LOW("Низкий"),
        MIDDLE("Средний"),
        HIGH("Высокий"),
        VERY_HIGH("Очень высокий");

        private String rus;
    }


}
