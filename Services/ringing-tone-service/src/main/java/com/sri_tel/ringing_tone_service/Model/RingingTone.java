package com.sri_tel.ringing_tone_service.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RingingTone {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ringingToneId;
    private String name;
    private String artist;

}
