package com.example.proyectoaquilerdeauditoriosbackend.services;

import com.example.proyectoaquilerdeauditoriosbackend.entities.Client;
import com.example.proyectoaquilerdeauditoriosbackend.repositories.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    public Optional<Client> getClient(int idClient) {
        return clientRepository.getClient(idClient);
    }

    public Client updateClient(Client client) {
        if (client.getIdClient() != null) {
            Optional<Client> clientOptional = clientRepository.getClient(client.getIdClient());
            if (!clientOptional.isEmpty()) {
                if (client.getPassword() != null && client.getPassword().length() <= 45) {
                    clientOptional.get().setPassword(client.getPassword());
                }
                if (client.getName() != null && client.getName().length() <= 250) {
                    clientOptional.get().setName(client.getName());
                }
                if (client.getAge() != null && client.getAge() instanceof Integer) {
                    clientOptional.get().setAge(client.getAge());
                }
                clientRepository.save(clientOptional.get());
                return clientOptional.get();
            } else {
                return client;
            }
        } else {
            return client;
        }
    }

    public boolean deleteClient(int idClient) {
        Boolean aBoolean = getClient(idClient).map(client -> {
            clientRepository.delete(client);
            return true;
        }).orElse(false);
        return aBoolean;
    }
}
