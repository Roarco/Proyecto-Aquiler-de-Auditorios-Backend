package com.example.proyectoaquilerdeauditoriosbackend.controller;

import com.example.proyectoaquilerdeauditoriosbackend.entities.Message;
import com.example.proyectoaquilerdeauditoriosbackend.services.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", methods= {RequestMethod.GET,RequestMethod.POST,RequestMethod.PUT,RequestMethod.DELETE})
@RequestMapping("/api/Message")
public class MessageController {

    @Autowired
    private MessageService messageService;

    @GetMapping("/all")
    public List<Message> getAllMessages(){
        return messageService.getAllMessages();
    }

    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public void saveMessage(@RequestBody Message message){
        messageService.saveMessage(message);
    }
}
