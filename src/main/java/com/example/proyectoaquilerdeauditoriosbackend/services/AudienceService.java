package com.example.proyectoaquilerdeauditoriosbackend.services;

import com.example.proyectoaquilerdeauditoriosbackend.entities.Audience;
import com.example.proyectoaquilerdeauditoriosbackend.repositories.AudienceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AudienceService {

    @Autowired
    private AudienceRepository audienceRepository;

    public List<Audience> getAllAudiences() {
        return audienceRepository.getAll();
    }

    public Audience saveAudience(Audience audience) {
        if (audience.getId() == null) {
            if (audience.getOwner().length() <= 45 && audience.getName().length() <= 45) {
                if (audience.getCapacity() instanceof Integer && audience.getDescription().length() <= 250) {
                    if (audience.getCategory() != null && audience.getCategory().getId() instanceof Integer) {
                        return audienceRepository.save(audience);
                    }
                }
            }
        }
        return audience;
    }
}
