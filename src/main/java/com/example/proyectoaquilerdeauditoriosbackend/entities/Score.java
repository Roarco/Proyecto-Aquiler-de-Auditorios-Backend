package com.example.proyectoaquilerdeauditoriosbackend.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "score")
@Setter
@Getter
public class Score {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Integer score;
    private String message;

    @OneToOne
    @JoinColumn(name = "reservation")
    @JsonIgnoreProperties({"score"})
    private Reservation reservation;


}
