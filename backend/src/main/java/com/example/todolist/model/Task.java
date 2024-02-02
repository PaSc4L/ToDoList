package com.example.todolist.model;

import jakarta.persistence.*;

@Entity
public class Task {

    //Task controller where we store all the tasks

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "mode")
    private int mode;

    public Task(){
        this("Unknown","Undefined");
    }

    public Task(String name, String description) {
        this.name = name;
        this.description = description;
        this.mode = 1;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getMode() {
        return mode;
    }

    public void setMode(int mode) {
        this.mode = mode;
    }
}
