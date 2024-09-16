package com.chathuralakshan.recruitease.billservice.entity;

import jakarta.persistence.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "bill")
public class Bill {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String billId;
    @ManyToOne
    @JoinColumn(name = "bill_acc_id")
    private BillAccount billAccount;
    @Column(nullable = false)
    private Double amount;
    @Column(nullable = false)
    private LocalDate billingPeriodStart;

    @Column(nullable = false)
    private LocalDate billingPeriodEnd;
    @CreatedDate
    private LocalDateTime issuedAt;

    @Column(nullable = false)
    private String status; // PENDING, PAID, OVERDUE

    @ManyToOne
    @JoinColumn(name = "payment_id")
    private Payment payment;


}
