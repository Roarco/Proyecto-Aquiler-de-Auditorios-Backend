package com.example.proyectoaquilerdeauditoriosbackend.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

/*
Como usuario .

Quiero Ingresar los valores de nombre, correo y contraseña

Para poder registrarme en el sistema.

Criterios de aceptación:

Los valores de correo y contraseña deben ser un texto de no más de 45 caracteres.

Los valores de nombre deben ser un texto de máximo 250 caracteres.
*/

@Entity
@Table(name = "admin")
@Setter
@Getter
public class Admin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String email;
    private String password;



}
