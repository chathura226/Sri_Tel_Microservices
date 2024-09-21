package com.sri_tel.ringing_tone_service.Service;

import com.sri_tel.ringing_tone_service.Model.CustomerRingingTone;
import com.sri_tel.ringing_tone_service.Model.RingingTone;
import com.sri_tel.ringing_tone_service.Repository.CustomerRingingToneRepository;
import com.sri_tel.ringing_tone_service.Repository.RingingToneRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomerRingingToneService {

    @Autowired
    private CustomerRingingToneRepository customerRingingToneRepository;

    @Autowired
    RingingToneRepository ringingToneRepository;

    public Optional<CustomerRingingTone> activateRingtone(String customerId, String ringingToneId) {
        try {
            Optional<CustomerRingingTone> storedCustomerEntry = customerRingingToneRepository.findByCustomerId(customerId);
            RingingTone ringingTone = ringingToneRepository.findByRingingToneId(Long.valueOf(ringingToneId));

            CustomerRingingTone customerEntry;

            if (storedCustomerEntry.isPresent()) {
                customerEntry = storedCustomerEntry.get();
            } else {
                customerEntry = new CustomerRingingTone();
                customerEntry.setCustomerId(customerId);
            }

            customerEntry.setRingingTone(ringingTone);
            customerRingingToneRepository.save(customerEntry);
            return Optional.of(customerEntry);
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    @Transactional
    public String deactivateRingtone(String customerId) {
        try{
            Optional<CustomerRingingTone> storedCustomerEntry = customerRingingToneRepository.findByCustomerId(customerId);
            CustomerRingingTone customerEntry;
            if(storedCustomerEntry.isPresent()){
                customerRingingToneRepository.deleteByCustomerId(customerId);
                return "Ringing tone deactivated successfully !!";
            }else{
                throw new Exception("not found activated ringing tone");
            }
        }catch (Exception e){
                return e.getMessage();
        }
    }

}
