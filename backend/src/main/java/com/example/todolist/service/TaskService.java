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

    /**
     * Create new task
     * @param task
     * @return saved task
     */
    public Task createTask(Task task){
        return taskRepository.save(task);
    }


    /*public Task updateTask(Task task){
        return null;
    }*/

    /**
     * get all tasks from one mode
     * @param mode id
     * @return displayed tasks
     */
    public ArrayList<Task> getAllTasks(int mode){
        ArrayList<Task> tasks;

        //check what kind of tasks we need to display
        //mode ids: 1=to-do, 2=in-progress, 3=done, 4=archived
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

    /**
     * Move task to the next mode
     * @param id (of the task)
     */
    public void moveTaskUp(Long id){
        //find the task by id (need to use optional, but when moving task it is sure that we have that id)
        Optional<Task> task = taskRepository.findById(id);
        Task entity = task.get(); //get the task

        //if task is 1 or 2 we can move it to the next mode. If not, we can only move it to the first mode
        //(so you can't place it to archived mode)
        if(entity.getMode()<3){
            entity.setMode((entity.getMode())+1);
        }else{
            entity.setMode(1);
        }
        taskRepository.save(entity);
    }

    /**
     * Move task to previous mode
     * @param id (of the task)
     */
    public void moveTaskDown(Long id){
        //find the task by id (need to use optional, but when moving task it is sure that we have that id)
        Optional<Task> task = taskRepository.findById(id);
        Task entity = task.get();

        //if task is in the first mode it can't go to previous mode, so it is placed to done
        //otherwise place task to previous mode
        if(entity.getMode()>1){
            entity.setMode((entity.getMode())-1);
        }else{
            entity.setMode(3);
        }
        taskRepository.save(entity);
    }

    /**
     * Delete task by id
     * @param id
     */
    public void deleteTask(Long id){
        taskRepository.deleteById(id);
    }

    /**
     * Move task to archived
     * @param id
     */
    public void archiveTask(Long id){
        //find the task by id (need to use optional, but when moving task it is sure that we have that id)
        Optional<Task> task = taskRepository.findById(id);
        Task entity = task.get();

        //if task is not in archived mode, move it to archived mode
        //if task is in the archived mode, move it to to-do mode (mode 1)
        if(entity.getMode()<4){
            entity.setMode(4);
        }else{
            entity.setMode(1);
        }
        taskRepository.save(entity);
    }
}
