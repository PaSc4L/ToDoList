package com.example.todolist.controller;


import com.example.todolist.model.Task;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.FileWriter;
import java.io.IOException;

@RestController
@RequestMapping(path = "/settings")
public class SettingsController {

    private String filePath = "../frontend/resources/settings.json";


    @RequestMapping(value = "/save/{backgroundId}", method = RequestMethod.POST)
    public ResponseEntity<?> createTask(@PathVariable(name = "backgroundId") Integer backgroundId){
        try (FileWriter fileWriter = new FileWriter(filePath)) {
            // Convert Settings object to JSON and write to file
            fileWriter.write("{ \"background_number\": " + backgroundId + "}");
            return ResponseEntity.ok().build();
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
