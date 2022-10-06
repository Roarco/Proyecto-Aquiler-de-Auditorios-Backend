package com.example.proyectoaquilerdeauditoriosbackend.services;

import com.example.proyectoaquilerdeauditoriosbackend.entities.Client;
import com.example.proyectoaquilerdeauditoriosbackend.repositories.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClientService {

    @Autowired
    private ClientRepository clientRepository;

    public List<Client> getAllClients() {
        return clientRepository.getAll();
    }

    public Client saveClient(Client client) {
        if (client.getIdClient() == null){
            if (client.getEmail().length() <= 45 && client.getPassword().length() <= 45){
                if (client.getName().length() <= 250 && client.getAge() instanceof Integer){
                    return clientRepository.save(client);
                }
            }
        }
        return client;
    }
}
