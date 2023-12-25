package com.example.todolist.controller;

import com.example.todolist.model.Task;
import com.example.todolist.service.TaskService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping(path = "/task")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public ResponseEntity<Task> createTask(@RequestBody Task task){
        try{
            taskService.createTask(task);
            return new ResponseEntity<>(task, HttpStatus.CREATED);
        }catch(Exception ex){
            return new ResponseEntity<>(task, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/tasks/{mode}", method = RequestMethod.POST)
    public ResponseEntity<ArrayList<Task>> getTasks(@PathVariable (name = "mode") int mode){
        try{
            ArrayList<Task> tasks = taskService.getAllTasks(mode);
            return new ResponseEntity<>(tasks, HttpStatus.OK);
        }catch(Exception ex){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
