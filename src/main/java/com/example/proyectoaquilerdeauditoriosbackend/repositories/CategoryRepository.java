package com.example.proyectoaquilerdeauditoriosbackend.repositories;

import com.example.proyectoaquilerdeauditoriosbackend.entities.Category;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CategoryRepository {

    @Autowired
    private CategoryCrudRepository categoryCrudRepository;

    public List<Category> getAll() {
        return (List<Category>) categoryCrudRepository.findAll();
    }

    public Category save(Category category) {
        return categoryCrudRepository.save(category);
    }
}
