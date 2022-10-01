package com.example.proyectoaquilerdeauditoriosbackend.services;

import com.example.proyectoaquilerdeauditoriosbackend.entities.Category;
import com.example.proyectoaquilerdeauditoriosbackend.repositories.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public List<Category> getAllCategories() {
        return categoryRepository.getAll();
    }

    public Category saveCategory(Category category) {
        if (category.getId() == null){
            if (category.getName().length() <= 45 && category.getDescription().length() <= 250){
                return categoryRepository.save(category);
            }else {
                return null;
            }
        } else {
            return category;
        }
    }
}
