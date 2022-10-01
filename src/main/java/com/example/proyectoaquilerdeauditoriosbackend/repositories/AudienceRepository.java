package com.example.proyectoaquilerdeauditoriosbackend.repositories;

import com.example.proyectoaquilerdeauditoriosbackend.entities.Audience;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class AudienceRepository {

    @Autowired
    private AudienceCrudRepository audienceCrudRepository;

    public List<Audience> getAll() {
        return (List<Audience>) audienceCrudRepository.findAll();
    }

    public Audience save(Audience audience) {
        return audienceCrudRepository.save(audience);
    }
}
