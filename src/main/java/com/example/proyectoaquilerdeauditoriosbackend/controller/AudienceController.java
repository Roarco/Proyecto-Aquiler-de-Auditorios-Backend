package com.example.proyectoaquilerdeauditoriosbackend.controller;

import com.example.proyectoaquilerdeauditoriosbackend.entities.Audience;
import com.example.proyectoaquilerdeauditoriosbackend.services.AudienceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", methods= {RequestMethod.GET,RequestMethod.POST,RequestMethod.PUT,RequestMethod.DELETE})
@RequestMapping("/api/Audience")
public class AudienceController {

    @Autowired
    private AudienceService audienceService;

    @GetMapping("/all")
    public List<Audience> getAllAudiences(){
        return audienceService.getAllAudiences();
    }

    @GetMapping("/{id}")
    public Audience getAudienceId(@PathVariable("id") int id){
       return audienceService.getAudience(id).get();
    }
    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public void saveAudience(@RequestBody Audience audience){
        audienceService.saveAudience(audience);
    }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public void updateAudience(@RequestBody Audience audience){
        audienceService.updateAudience(audience);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteAudience(@PathVariable("id") int id){
        audienceService.deleteAudience(id);
    }
}
