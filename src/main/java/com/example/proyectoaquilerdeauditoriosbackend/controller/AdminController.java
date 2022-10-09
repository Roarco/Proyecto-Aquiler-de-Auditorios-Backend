package com.example.proyectoaquilerdeauditoriosbackend.controller;

import com.example.proyectoaquilerdeauditoriosbackend.entities.Admin;
import com.example.proyectoaquilerdeauditoriosbackend.services.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/Admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping
    public List<Admin> getAllAdmins(){
        return adminService.getAllAdmins();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void saveAdmin(@RequestBody Admin admin){
        adminService.saveAdmin(admin);
    }
}
