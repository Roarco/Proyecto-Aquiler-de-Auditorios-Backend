package com.example.proyectoaquilerdeauditoriosbackend.services;

import com.example.proyectoaquilerdeauditoriosbackend.entities.Message;
import com.example.proyectoaquilerdeauditoriosbackend.repositories.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MessageService {

    @Autowired
    private MessageRepository messageRepository;

    public List<Message> getAllMessages() {
        return messageRepository.getAll();
    }

    public Message saveMessage(Message message) {
        if (message.getIdMessage() == null) {
            if (message.getMessageText().length() <= 250) {
                if (message.getAudience().getId() instanceof Integer && message.getClient().getIdClient() instanceof Integer) {
                    return messageRepository.save(message);
                }
            }

        }
        return message;
    }

    public Optional<Message> getMessage(int id) {
        return messageRepository.getMessage(id);
    }

    public Message updateMessage(Message message) {
        if (message.getIdMessage() != null) {
            Optional<Message> e = messageRepository.getMessage(message.getIdMessage());
            if (!e.isEmpty()) {
                if (message.getMessageText() != null && message.getMessageText().length() <= 250) {
                    e.get().setMessageText(message.getMessageText());
                }
                messageRepository.save(e.get());
                return e.get();
            }else {
                return message;
            }
        }else {
            return message;
        }

    }
}
