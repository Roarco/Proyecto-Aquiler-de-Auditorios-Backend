package com.example.proyectoaquilerdeauditoriosbackend.services;

import com.example.proyectoaquilerdeauditoriosbackend.entities.Reservation;
import com.example.proyectoaquilerdeauditoriosbackend.repositories.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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
                    if (reservation.getAudience().getId() instanceof Integer && reservation.getClient().getIdClient() instanceof Integer){
                        //le asignamos el status 'created' a la reserva
                        reservation.setStatus("created");
                        return reservationRepository.save(reservation);
                    }
            }
        }
        return reservation;
    }

    public Optional<Reservation> getReservation(int idReservation) {
        return reservationRepository.getReservation(idReservation);
    }

    public Reservation updateReservation(Reservation reservation) {
        if (reservation.getIdReservation() != null) {
            Optional<Reservation> e = reservationRepository.getReservation(reservation.getIdReservation());
            if (!e.isEmpty()) {
                if (reservation.getStartDate() != null && reservation.getDevolutionDate() != null) {
                   //validar que la fecha de inicio sea anterior a la fecha de devolucion
                    if (reservation.getStartDate().before(reservation.getDevolutionDate())) {
                        e.get().setStartDate(reservation.getStartDate());
                        e.get().setDevolutionDate(reservation.getDevolutionDate());
                    }
                }
                if (reservation.getStatus() != null) {
                    e.get().setStatus(reservation.getStatus());
                }
                reservationRepository.save(e.get());
                return e.get();
            }else {
                return reservation;
            }
        }else {
            return reservation;
        }
    }

    public boolean deleteReservation(int idReservation) {
        Boolean aBoolean = getReservation(idReservation).map(reservation -> {
            reservationRepository.delete(reservation);
            return true;
        }).orElse(false);
        return aBoolean;
    }
}
