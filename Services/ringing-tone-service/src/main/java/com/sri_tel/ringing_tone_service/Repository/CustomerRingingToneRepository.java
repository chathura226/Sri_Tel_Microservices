package com.sri_tel.ringing_tone_service.Repository;

import com.sri_tel.ringing_tone_service.Model.CustomerRingingTone;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CustomerRingingToneRepository extends JpaRepository<CustomerRingingTone, String> {
    Optional<CustomerRingingTone> findByCustomerId(String customerId);

    void deleteByCustomerId(String customerId);
}
