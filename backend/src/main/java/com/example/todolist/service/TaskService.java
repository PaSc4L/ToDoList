package com.example.todolist.service;

import com.example.todolist.model.Task;
import com.example.todolist.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    public Task createTask(Task task){
        return taskRepository.save(task);
    }

    public Task updateTask(Task task){
        return null;
    }
    public ArrayList<Task> getAllTasks(int mode){
        ArrayList<Task> tasks;
        if(mode == 1){
            tasks = taskRepository.findAllByMode(1);
        }else if(mode == 2){
            tasks = taskRepository.findAllByMode(2);
        }else if(mode == 3){
            tasks = taskRepository.findAllByMode(3);
        }else if(mode == 4){
            tasks = taskRepository.findAllByMode(4);
        }else{
            return null;
        }
        return tasks;
    }

    public void updateMode(Long id){
        Optional<Task> task = taskRepository.findById(id);
        Task entity = task.get();
        if(entity.getMode()<4){
            entity.setMode((entity.getMode())+1);
        }
        taskRepository.save(entity);
    }

    public void moveTaskUp(Long id){
        Optional<Task> task = taskRepository.findById(id);
        Task entity = task.get();
        if(entity.getMode()<3){
            entity.setMode((entity.getMode())+1);
        }else{
            entity.setMode(1);
        }
        taskRepository.save(entity);
    }
    public void moveTaskDown(Long id){
        Optional<Task> task = taskRepository.findById(id);
        Task entity = task.get();
        if(entity.getMode()>1){
            entity.setMode((entity.getMode())-1);
        }else{
            entity.setMode(3);
        }
        taskRepository.save(entity);
    }

    public void deleteTask(Long id){
        taskRepository.deleteById(id);
    }

    public void archiveTask(Long id){
        Optional<Task> task = taskRepository.findById(id);
        Task entity = task.get();
        if(entity.getMode()<4){
            entity.setMode(4);
        }else{
            entity.setMode(1);
        }
        taskRepository.save(entity);
    }
}
