package com.example.proyectoaquilerdeauditoriosbackend.services;

import com.example.proyectoaquilerdeauditoriosbackend.entities.Reservation;
import com.example.proyectoaquilerdeauditoriosbackend.repositories.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

    public List<Reservation> getAllReservations() {
        //validamos que venga un score en la lista y si no viene lo creamos lo ponemos como null
        List<Reservation> reservations = reservationRepository.getAll();
        for (Reservation reservation : reservations) {
            if (reservation.getScore().isEmpty()) {
                reservation.setScore(null);
            }
        }
        return reservations;
    }

    public Reservation saveReservation(Reservation reservation) {
        if (reservation.getIdReservation() == null){
            if (reservation.getStartDate() != null && reservation.getDevolutionDate() != null){
                //validamos con una expresion regular que el formato de la fecha sea correcto 'yyyy-MM-dd'
                if (reservation.getStartDate().matches("[0-9]{4}-[0-9]{2}-[0-9]{2}") && reservation.getDevolutionDate().matches("[0-9]{4}-[0-9]{2}-[0-9]{2}")){
                    if (reservation.getAudience().getId() instanceof Integer && reservation.getClient().getIdClient() instanceof Integer){
                        //le asignamos el status 'created' a la reserva
                        reservation.setStatus("created");
                        return reservationRepository.save(reservation);
                    }
                }
            }
        }
        return reservation;
    }
}
