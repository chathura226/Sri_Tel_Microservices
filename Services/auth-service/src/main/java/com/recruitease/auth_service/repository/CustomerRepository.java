package com.recruitease.auth_service.repository;

import com.recruitease.auth_service.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, String> {
    boolean existsByMobileNumber(String number);

    Optional<Customer> findByUserId(String userId);
}
