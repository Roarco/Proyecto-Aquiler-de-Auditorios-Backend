package com.example.proyectoaquilerdeauditoriosbackend.repositories;

import com.example.proyectoaquilerdeauditoriosbackend.entities.Audience;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class AudienceRepository {

    @Autowired
    private AudienceCrudRepository audienceCrudRepository;

    public List<Audience> getAll() {
        return (List<Audience>) audienceCrudRepository.findAll();
    }

    public Optional<Audience> getAudience(int id) {
        return audienceCrudRepository.findById(id);
     }

    public Audience save(Audience audience) {
        return audienceCrudRepository.save(audience);
    }
}
