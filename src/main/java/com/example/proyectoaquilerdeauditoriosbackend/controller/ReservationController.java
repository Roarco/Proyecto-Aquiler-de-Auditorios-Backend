package com.example.proyectoaquilerdeauditoriosbackend.controller;

import com.example.proyectoaquilerdeauditoriosbackend.entities.Reservation;
import com.example.proyectoaquilerdeauditoriosbackend.services.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", methods= {RequestMethod.GET,RequestMethod.POST,RequestMethod.PUT,RequestMethod.DELETE})
@RequestMapping("/api/Reservation")
public class ReservationController {
     @Autowired
     private ReservationService reservationService;

     @GetMapping("/all")
     public List<Reservation> getAllReservations(){
         return reservationService.getAllReservations();
     }

     @PostMapping("/save")
     @ResponseStatus(HttpStatus.CREATED)
     public void saveReservation(@RequestBody Reservation reservation){
          reservationService.saveReservation(reservation);
     }
}
