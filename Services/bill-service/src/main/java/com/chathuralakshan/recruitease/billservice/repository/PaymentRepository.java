package com.chathuralakshan.recruitease.billservice.repository;

import com.chathuralakshan.recruitease.billservice.entity.Bill;
import com.chathuralakshan.recruitease.billservice.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentRepository extends JpaRepository<Payment,String> {
}
