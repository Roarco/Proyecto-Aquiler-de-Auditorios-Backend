package com.example.proyectoaquilerdeauditoriosbackend.services;

import com.example.proyectoaquilerdeauditoriosbackend.entities.Score;
import com.example.proyectoaquilerdeauditoriosbackend.repositories.ScoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ScoreService {

    @Autowired
    private ScoreRepository scoreRepository;

    public List<Score> getAllScores() {
        return scoreRepository.getAll();
    }

    public Score saveScore(Score score){
        if (score.getId() == null){
            if (score.getScore() instanceof Integer && score.getScore() >= 0 && score.getScore() <= 5){
                if (score.getMessage().length() <= 250){
                    return scoreRepository.save(score);
                }
            }
        }
        return score;
    }
}
