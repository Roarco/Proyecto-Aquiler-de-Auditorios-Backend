package com.example.proyectoaquilerdeauditoriosbackend.repositories;

import com.example.proyectoaquilerdeauditoriosbackend.entities.Reservation;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.Date;
import java.util.List;

public interface ReservationCrudRepository extends CrudRepository<Reservation, Integer> {

    @Query
    public List<Reservation> findAllByStartDateAfterAndStartDateBefore(Date dateOne, Date dateTwo);

    @Query
    public List<Reservation> findAllByStatus(String status);

    //select client, count(*) as "total" from reservation group by clientId order by total desc;
    @Query(value = "SELECT c.client, COUNT(c.client) from Reservation AS c GROUP BY c.client ORDER BY COUNT(c.client) DESC")
    public List<Object[]> countTotalReservationsByClient();
}

