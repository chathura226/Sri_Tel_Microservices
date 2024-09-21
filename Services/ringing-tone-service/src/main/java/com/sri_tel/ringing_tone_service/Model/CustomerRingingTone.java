package com.sri_tel.ringing_tone_service.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomerRingingTone {

    @Id
    private String customerId;

    @ManyToOne
    private RingingTone ringingTone;

}
