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

     @GetMapping("/{id}")
     public Reservation getReservationId(@PathVariable("id") int id){
          return reservationService.getReservation(id).get();
     }

     @GetMapping("/report-dates/{dateOne}/{dateTwo}")
     public List<Reservation> getReservationByDates(@PathVariable("dateOne") String dateOne, @PathVariable("dateTwo") String dateTwo){
          return reservationService.getReservationByDates(dateOne, dateTwo);
     }


     @PostMapping("/save")
     @ResponseStatus(HttpStatus.CREATED)
     public void saveReservation(@RequestBody Reservation reservation){
          reservationService.saveReservation(reservation);
     }

     @PutMapping("/update")
     @ResponseStatus(HttpStatus.CREATED)
     public void updateReservation(@RequestBody Reservation reservation){
          reservationService.updateReservation(reservation);
     }

     @DeleteMapping("/{id}")
     @ResponseStatus(HttpStatus.NO_CONTENT)
     public void deleteReservation(@PathVariable("id") int id){
          reservationService.deleteReservation(id);
     }
}
