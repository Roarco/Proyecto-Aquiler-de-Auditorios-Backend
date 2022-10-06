package com.example.proyectoaquilerdeauditoriosbackend.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;
import javax.persistence.*;
import java.util.List;

/*
Como usuario .

Quiero ingresar los valores de nombre, correo, edad y contraseña.

Para poder resgistrarse en el sistema.

Criterios de aceptación:

Los valores de correo y contraseña deben ser un texto de no más de 45 caracteres.

Los valores de edad deben ser un número que represente los años.

Los valores de nombre deben ser un texto de máximo 250 caracteres.
*/

@Entity
@Table(name = "client")
@Setter
@Getter
public class Client {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idClient;
    private String email;
    private String password;
    private Integer age;
    private String name;

    @OneToMany(cascade = {CascadeType.PERSIST}, mappedBy = "client")
    @JsonIgnoreProperties({"client"})
    private List<Message> messages;

    @OneToMany(cascade = {CascadeType.PERSIST}, mappedBy = "client")
    @JsonIgnoreProperties({"client"})
    private List<Reservation> reservations;

}
