package com.chathuralakshan.recruitease.billservice.repository;

import com.chathuralakshan.recruitease.billservice.entity.BillAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Dictionary;
import java.util.Optional;

@Repository
public interface BillAccountRepository extends JpaRepository<BillAccount,String> {
    Optional<BillAccount> findByMobileNumber(String customerId);
}
