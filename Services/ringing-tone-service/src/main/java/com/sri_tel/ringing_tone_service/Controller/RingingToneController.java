package com.sri_tel.ringing_tone_service.Controller;

import com.sri_tel.ringing_tone_service.Model.CustomerRingingTone;
import com.sri_tel.ringing_tone_service.Model.RingingTone;
import com.sri_tel.ringing_tone_service.Service.CustomerRingingToneService;
import com.sri_tel.ringing_tone_service.Service.RingingToneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/ringtones")
public class RingingToneController {

    @Autowired
    private RingingToneService ringingToneService;

    @Autowired
    private CustomerRingingToneService customerRingingToneService;

    //get all ringing tones
    @GetMapping("/all")
    public ResponseEntity<List<RingingTone>> getAllRingtones() {
        List<RingingTone> ringtones = ringingToneService.getAllRingtones();
        return ResponseEntity.ok(ringtones);
    }

    //get ringing tone by customer id
    @GetMapping
    public ResponseEntity<Optional<RingingTone>> getRingtone(@RequestParam String customerId) {
        Optional<RingingTone> ringingTone = ringingToneService.getRingtone(customerId);
        if (ringingTone.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(ringingTone);
    }


    //activate ringing tone
    @PostMapping("/activate")
    public ResponseEntity<Optional<CustomerRingingTone>> activateRingtone(@RequestParam String customerId, @RequestParam String ringingToneId) {
        Optional<CustomerRingingTone> activatedRingtone = customerRingingToneService.activateRingtone(customerId, ringingToneId);
        if (activatedRingtone.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(activatedRingtone);
    }

    // deactivate ringing tone
    @PostMapping("/deactivate")
    public ResponseEntity<String> deactivateRingtone(@RequestParam String customerId) {
        String deactivatedRingtone = customerRingingToneService.deactivateRingtone(customerId);
        if (deactivatedRingtone == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(deactivatedRingtone);
    }

}
