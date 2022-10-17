package com.example.proyectoaquilerdeauditoriosbackend.services;

import com.example.proyectoaquilerdeauditoriosbackend.entities.ReportEstatus;
import com.example.proyectoaquilerdeauditoriosbackend.entities.Reservation;
import com.example.proyectoaquilerdeauditoriosbackend.repositories.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
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
                        //validamos que venga un status, si no viene lo ponemos como "created"
                        if (reservation.getStatus().isEmpty()){
                            reservation.setStatus("created");
                        }
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

    public List<Reservation> getReservationByDates(String dateOne, String dateTwo){
       SimpleDateFormat parser = new SimpleDateFormat("yyyy-MM-dd");
        Date dateOneParsed = new Date();
        Date dateTwoParsed = new Date();
        try{
            dateOneParsed = parser.parse(dateOne);
            dateTwoParsed = parser.parse(dateTwo);
        }catch (Exception e){
            e.printStackTrace();
        }
        if (dateOneParsed.before(dateTwoParsed)){
            return reservationRepository.getReservationByDates(dateOneParsed, dateTwoParsed);
        }else {
            return new ArrayList<>();
        }
    }

    public ReportEstatus getReport(){
       //me traigo todas las reservaciones
        List<Reservation> reservations = reservationRepository.getAll();
        //creo un objeto de tipo ReportEstatus
        ReportEstatus reportEstatus = new ReportEstatus(0,0);
        //recorro la lista de reservaciones
        for (Reservation reservation : reservations) {
            //si el status es completed
            if (reservation.getStatus().equals("completed")){
                //aumento en 1 el contador de completed
                reportEstatus.setCompleted(reportEstatus.getCompleted()+1);
            } else if (reservation.getStatus().equals("cancelled")) {
                //aumento en 1 el contador de cancelled
                reportEstatus.setCancelled(reportEstatus.getCancelled()+1);
            }
        }
        return reportEstatus;
    }
}
