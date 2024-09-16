package com.recruitease.auth_service.repository;

import com.recruitease.auth_service.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdminRepository extends JpaRepository<Admin, String> {
    boolean existsByMobileNumber(String mobileNumber);

    Optional<Admin> findByUserId(String userId);
}
