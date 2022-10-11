package com.example.proyectoaquilerdeauditoriosbackend.entities;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "reservation")
@Setter
@Getter
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idReservation;
    private String startDate;
    private String devolutionDate;
    private String status;



    @ManyToOne
    @JoinColumn(name = "audience")
    @JsonIgnoreProperties({ "reservations"})
    private Audience audience;

    @ManyToOne
    @JoinColumn(name = "client")
    @JsonIgnoreProperties({"messages", "reservations"})
    private Client client;

    @OneToMany(cascade = {CascadeType.PERSIST}, mappedBy = "reservation")
    @JsonIgnoreProperties({"reservation"})
    private List<Score> score;

}
