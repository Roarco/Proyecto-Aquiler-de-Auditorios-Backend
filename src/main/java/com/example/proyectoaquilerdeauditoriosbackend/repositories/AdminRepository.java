package com.example.proyectoaquilerdeauditoriosbackend.repositories;

import com.example.proyectoaquilerdeauditoriosbackend.entities.Admin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class AdminRepository {

    @Autowired
    private AdminCrudRepository adminCrudRepository;

    public List<Admin> getAllAdmins() {
        return (List<Admin>) adminCrudRepository.findAll();
    }

    public Admin saveAdmin(Admin admin) {
        return adminCrudRepository.save(admin);
    }
}
