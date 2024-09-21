package com.sri_tel.ringing_tone_service.Repository;

import com.sri_tel.ringing_tone_service.Model.RingingTone;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RingingToneRepository extends JpaRepository<RingingTone, Long> {
    RingingTone findByRingingToneId(Long ringingToneId);
}