package com.example.proyectoaquilerdeauditoriosbackend.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

/*
Como usuario .

Quiero Ingresar los valores de calificación, mensaje y reserva.

Para poder calificar una reserva.

Criterios de aceptación:

Los valores de calificación debe ser un número entero entre 0 y 5.

Los valores de mensaje deben ser un texto no superior a 250 caracteres.

El valor de la reserva es un número entero y debe ser tomado de la reserva que se esté calificando. El usuario no ingresa el número de reserva.
*/
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

    @ManyToOne
    @JoinColumn(name = "reservation")
    private Reservation reservation;


}
