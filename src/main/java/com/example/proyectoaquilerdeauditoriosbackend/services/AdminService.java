package com.example.proyectoaquilerdeauditoriosbackend.services;

import com.example.proyectoaquilerdeauditoriosbackend.entities.Admin;
import com.example.proyectoaquilerdeauditoriosbackend.repositories.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    public List<Admin> getAllAdmins() {
        return adminRepository.getAllAdmins();
    }

    public Admin saveAdmin(Admin admin) {
       if (admin.getId() == null){
           if(admin.getEmail().length() <= 45 && admin.getPassword().length() <= 45){
               if(admin.getName().length() <= 250){
                   return adminRepository.saveAdmin(admin);
               }
           }
       }
         return admin;
    }
}
