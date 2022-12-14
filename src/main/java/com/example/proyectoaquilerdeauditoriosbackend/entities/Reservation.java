package com.example.proyectoaquilerdeauditoriosbackend.entities;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "reservation")
@Setter
@Getter
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idReservation;
    private Date startDate;
    private Date devolutionDate;
    private String status;



    @ManyToOne
    @JoinColumn(name = "audience")
    @JsonIgnoreProperties({ "reservations"})
    private Audience audience;

    @ManyToOne
    @JoinColumn(name = "client")
    @JsonIgnoreProperties({"messages", "reservations"})
    private Client client;

    @OneToOne(cascade = {CascadeType.REMOVE}, mappedBy = "reservation")
    @JsonIgnoreProperties({"reservation", "client"})
    private Score score;

}
