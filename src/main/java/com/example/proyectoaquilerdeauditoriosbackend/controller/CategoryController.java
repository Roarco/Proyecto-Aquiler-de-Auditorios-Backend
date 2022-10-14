package com.example.proyectoaquilerdeauditoriosbackend.controller;

import com.example.proyectoaquilerdeauditoriosbackend.entities.Category;
import com.example.proyectoaquilerdeauditoriosbackend.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", methods= {RequestMethod.GET,RequestMethod.POST,RequestMethod.PUT,RequestMethod.DELETE})
@RequestMapping("/api/Category")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping("/all")
    public List<Category> getAllCategories(){
        return categoryService.getAllCategories();
    }

    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public void saveCategory(@RequestBody Category category){
        categoryService.saveCategory(category);
    }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public void updateCategory(@RequestBody Category category){
        categoryService.updateCategory(category);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCategory(@PathVariable("id") int id){
        categoryService.deleteCategory(id);
    }
}
