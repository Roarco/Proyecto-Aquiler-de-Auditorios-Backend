package com.example.proyectoaquilerdeauditoriosbackend.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

/*
 Como usuario .

Quiero Ingresar los valores de auditorio y texto.

Para poder registrar en el sistema un mensaje.

Criterios de aceptación:

Los valores de texto deben ser una cadena de caracteres no superior a 250 caracteres

El valor de auditorio corresponde al id de cada auditorio y es un valor numérico.

El usuario debe seleccionar el auditorio por su nombre, puesto que el id debe ser invisible para el usuario.
 */
@Entity
@Table(name = "message")
@Setter
@Getter
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idMessage;
    private String messageText;

    @ManyToOne
    @JoinColumn(name = "audience")
    @JsonIgnoreProperties({"messages", "reservations"})
    private Audience audience;

    @ManyToOne
    @JoinColumn(name = "client")
    @JsonIgnoreProperties({"messages", "reservations"})
    private Client client;
}
