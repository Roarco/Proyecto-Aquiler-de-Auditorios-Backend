package com.example.proyectoaquilerdeauditoriosbackend.services;

import com.example.proyectoaquilerdeauditoriosbackend.entities.Score;
import com.example.proyectoaquilerdeauditoriosbackend.repositories.ScoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    public Optional<Score> getScore(int id){
        return scoreRepository.getScore(id);
    }

    public Score updateScore(Score score){
        if (score.getId() != null) {
            Optional<Score> e = scoreRepository.getScore(score.getId());
            if (!e.isEmpty()){
                if (score.getScore() instanceof Integer && score.getScore() >= 0 && score.getScore() <= 5){
                    if (score.getMessage().length() <= 250){
                        if (score.getReservation() != null){
                            e.get().setReservation(score.getReservation());
                        }
                        e.get().setScore(score.getScore());
                        e.get().setMessage(score.getMessage());
                    }
                }
                scoreRepository.save(e.get());
                return e.get();
            }else {
                return score;
            }
        }else {
            return score;
        }
    }
}
