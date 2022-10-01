package com.example.proyectoaquilerdeauditoriosbackend.controller;

import com.example.proyectoaquilerdeauditoriosbackend.entities.Audience;
import com.example.proyectoaquilerdeauditoriosbackend.services.AudienceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/Audience")
public class AudienceController {

    @Autowired
    private AudienceService audienceService;

    @GetMapping("/all")
    public List<Audience> getAllAudiences(){
        return audienceService.getAllAudiences();
    }
    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public void saveAudience(@RequestBody Audience audience){
        audienceService.saveAudience(audience);
    }
}
