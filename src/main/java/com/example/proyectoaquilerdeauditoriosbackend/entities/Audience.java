package com.example.proyectoaquilerdeauditoriosbackend.entities;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import javax.persistence.*;
@Entity
@Table(name = "audience")
@Getter
@Setter
public class Audience {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String owner;
    private Integer capacity;
    private String description;

    @ManyToOne
    @JoinColumn(name = "category")
    @JsonIgnoreProperties("audiences")
    private Category category;

}
