package com.chathuralakshan.recruitease.billservice.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "bill_account")
@Getter
@Setter
public class BillAccount {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String billAccId;
    @Column(unique = true)
    private String mobileNumber; //each mobile number is associated with a billing account
    @Column(nullable = false)
    private Double currentBalance;


    @Column(nullable = false)
    private String status; // ACTIVE, SUSPENDED


    @LastModifiedDate
    private LocalDateTime lastModifiedAt;

}
