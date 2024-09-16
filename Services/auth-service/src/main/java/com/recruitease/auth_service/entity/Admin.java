package com.recruitease.auth_service.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "admin")
public class Admin {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String adminId;

    @OneToOne
    @JoinColumn(name = "user_id")
    private UserCredential user;
    private String firstName;
    private String lastName;
    @Column(unique = true)
    private String mobileNumber;


}
