package com.example.todolist.service;

import com.example.todolist.model.Task;
import com.example.todolist.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    public Task createTask(Task task){
        return taskRepository.save(task);
    }

    public Task updateTask(Task task){

    }

    public void getAllToDo(){

    }

    public void getAllProgress(){

    }

    public void getAllDone(){

    }

    public void getAllArchived(){

    }

    public void deleteTask(){

    }
}
