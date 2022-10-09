package com.example.proyectoaquilerdeauditoriosbackend.repositories;

import com.example.proyectoaquilerdeauditoriosbackend.entities.Score;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ScoreRepository {

    @Autowired
    private ScoreCrudRepository scoreCrudRepository;

    public List<Score> getAll(){
        return (List<Score>) scoreCrudRepository.findAll();
    }

    public Score save(Score score){
        return scoreCrudRepository.save(score);
    }
}
