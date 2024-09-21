package com.sri_tel.ringing_tone_service.Service;

import com.sri_tel.ringing_tone_service.Model.CustomerRingingTone;
import com.sri_tel.ringing_tone_service.Model.RingingTone;
import com.sri_tel.ringing_tone_service.Repository.CustomerRingingToneRepository;
import com.sri_tel.ringing_tone_service.Repository.RingingToneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RingingToneService {

    @Autowired
    private RingingToneRepository ringtoneRepository;

    @Autowired
    CustomerRingingToneRepository customerRingingToneRepository;

    public List<RingingTone> getAllRingtones() {
        return ringtoneRepository.findAll();
    }

    public Optional<RingingTone> getRingtone(String customerId) {
        try {
            Optional<CustomerRingingTone> storedCustomerEntry = customerRingingToneRepository.findByCustomerId(customerId);
            if (storedCustomerEntry.isPresent()) {
                CustomerRingingTone customerEntry = storedCustomerEntry.get();
                RingingTone ringingTone = customerEntry.getRingingTone();
                return Optional.ofNullable(ringingTone);
            } else {
                return Optional.empty();
            }
        } catch (Exception e) {
            return Optional.empty();
        }
    }

}
