package com.recruitease.auth_service.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "customer")
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String customerId;
    @OneToOne
    @JoinColumn(name = "user_id")
    private UserCredential user;
    private String firstName;
    private String lastName;
    @Column(unique = true)
    private String mobileNumber;

}
