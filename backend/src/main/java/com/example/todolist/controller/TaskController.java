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

    //calling taskService
    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    /**
     * Add task
     * @param task
     * @return HttpStatus with task
     */
    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public ResponseEntity<Task> createTask(@RequestBody Task task){
        try{
            taskService.createTask(task);
            return new ResponseEntity<>(task, HttpStatus.CREATED);
        }catch(Exception ex){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Get tasks by mode
     * @param mode
     * @return Http status and a list of the tasks selected by mode
     */
    @RequestMapping(value = "/tasks/{mode}", method = RequestMethod.GET)
    public ResponseEntity<ArrayList<Task>> getTasks(@PathVariable (name = "mode") int mode){
        try{
            ArrayList<Task> tasks = taskService.getAllTasks(mode);
            return new ResponseEntity<>(tasks, HttpStatus.OK);
        }catch(Exception ex){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Delete by id
     * @param id
     * @return Successful delete and HttpStatus
     */
    @RequestMapping(value="delete/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<String> deleteTask(@PathVariable (name = "id") Long id){
        try{
            taskService.deleteTask(id);
            return new ResponseEntity<>("Delete was successful", HttpStatus.OK);
        }catch(Exception ex){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Move task to next mode
     * @param id
     * @return Successful update and HttpStatus
     */
    @RequestMapping(value="moveTaskUp/{id}", method = RequestMethod.POST)
    public ResponseEntity<String> moveTaskUp(@PathVariable (name = "id") Long id){
        try{
            taskService.moveTaskUp(id);
            return new ResponseEntity<>("Task mode successfully updated!", HttpStatus.OK);
        }catch(Exception ex){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Move task to previous mode
     * @param id
     * @return Successful update and HttpStatus
     */
    @RequestMapping(value="moveTaskDown/{id}", method = RequestMethod.POST)
    public ResponseEntity<String> moveTaskDown(@PathVariable (name = "id") Long id){
        try{
            taskService.moveTaskDown(id);
            return new ResponseEntity<>("Task mode successfully updated!", HttpStatus.OK);
        }catch(Exception ex){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Archive or unarchive task
     * @param id
     * @return Task archived with httpStatus
     */
    @RequestMapping(value="archive/{id}", method = RequestMethod.POST)
    public ResponseEntity<String> archive(@PathVariable (name = "id") Long id){
        try{
            taskService.archiveTask(id);
            return new ResponseEntity<>("Task archived!", HttpStatus.OK);
        }catch(Exception ex){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
