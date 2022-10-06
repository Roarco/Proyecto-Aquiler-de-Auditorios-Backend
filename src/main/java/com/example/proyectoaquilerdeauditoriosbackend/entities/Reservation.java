package com.example.proyectoaquilerdeauditoriosbackend.entities;

/*
Como usuario .

Quiero Ingresar los valores de auditorio, cliente, fecha inicio, fecha entrega

Para poder registrar en el sistema una reserva.

Criterios de aceptación:

Los valores de cliente debe ser un numero entero correspondiente al id del cliente.

El valor de auditorio corresponde al id de cada auditorio y es un valor numérico.

El usuario debe seleccionar el auditorio por su nombre, puesto que el id debe ser invisible para el usuario.

Los valores de fecha de inicio y fecha entrega deben ser fechas en el formato YYYY-mm-dd.

La reserva creada debe tener status: 'Creado' y la fecha de creación, debe ser tomada del reloj del sistema. No son datos que el usuario ingrese.
*/

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;

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
    private String score;



    @ManyToOne
    @JoinColumn(name = "audience")
    @JsonIgnoreProperties({ "reservations"})
    private Audience audience;

    @ManyToOne
    @JoinColumn(name = "client")
    @JsonIgnoreProperties({"messages", "reservations"})
    private Client client;
}
