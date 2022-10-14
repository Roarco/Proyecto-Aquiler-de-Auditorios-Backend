package com.example.proyectoaquilerdeauditoriosbackend.repositories;

import com.example.proyectoaquilerdeauditoriosbackend.entities.Admin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class AdminRepository {

    @Autowired
    private AdminCrudRepository adminCrudRepository;

    public List<Admin> getAllAdmins() {
        return (List<Admin>) adminCrudRepository.findAll();
    }

    public Optional<Admin> getAdminById(int id) {
        return adminCrudRepository.findById(id);
    }

    public Admin saveAdmin(Admin admin) {
        return adminCrudRepository.save(admin);
    }

    public void deleteAdmin(Admin admin) {
        adminCrudRepository.delete(admin);
    }
}
