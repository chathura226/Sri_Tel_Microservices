package com.chathuralakshan.recruitease.billservice.repository;

import com.chathuralakshan.recruitease.billservice.entity.Bill;
import com.chathuralakshan.recruitease.billservice.entity.BillAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BillRepository extends JpaRepository<Bill,String> {
    List<Bill> findAllByBillAccount(BillAccount billAccount);
}
