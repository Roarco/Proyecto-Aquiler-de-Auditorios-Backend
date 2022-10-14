package com.example.proyectoaquilerdeauditoriosbackend.services;

import com.example.proyectoaquilerdeauditoriosbackend.entities.Audience;
import com.example.proyectoaquilerdeauditoriosbackend.repositories.AudienceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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


    public Optional<Audience> getAudience(int id) {
        return audienceRepository.getAudience(id);
    }

    public Audience updateAudience(Audience audience) {
        if (audience.getId() != null) {
            Optional<Audience> audienceOptional = audienceRepository.getAudience(audience.getId());
            if (!audienceOptional.isEmpty()){
                if (audience.getOwner() != null) {
                    audienceOptional.get().setOwner(audience.getOwner());
                }
                if (audience.getName() != null) {
                    audienceOptional.get().setName(audience.getName());
                }
                if (audience.getCapacity() != null) {
                    audienceOptional.get().setCapacity(audience.getCapacity());
                }
                if (audience.getDescription() != null) {
                    audienceOptional.get().setDescription(audience.getDescription());
                }
                if (audience.getCategory() != null) {
                    audienceOptional.get().setCategory(audience.getCategory());
                }
                audienceRepository.save(audienceOptional.get());
                return audienceOptional.get();
            } else {
                return audience;
            }
        } else {
            return audience;
        }
    }
}
