package com.example.proyectoaquilerdeauditoriosbackend.services;

import com.example.proyectoaquilerdeauditoriosbackend.entities.Admin;
import com.example.proyectoaquilerdeauditoriosbackend.repositories.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    public Optional<Admin> getAdmin(int id) {
        return adminRepository.getAdminById(id);
    }

    public Admin updateAdmin(Admin admin) {
        if (admin.getId() != null){
            Optional<Admin> e = adminRepository.getAdminById(admin.getId());
            if (!e.isEmpty()){
                if(admin.getPassword().length() <= 45  && admin.getName().length() <= 250){
                    e.get().setPassword(admin.getPassword());
                    e.get().setName(admin.getName());
                }
                adminRepository.saveAdmin(e.get());
                return e.get();
            }else {
                return admin;
            }
        }else {
            return admin;
        }
    }
}
