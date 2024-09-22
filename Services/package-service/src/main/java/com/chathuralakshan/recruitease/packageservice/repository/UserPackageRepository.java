package com.chathuralakshan.recruitease.packageservice.repository;

import com.chathuralakshan.recruitease.packageservice.model.PackageType;
import com.chathuralakshan.recruitease.packageservice.model.SriPackage;
import com.chathuralakshan.recruitease.packageservice.model.UserPackage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserPackageRepository extends JpaRepository<UserPackage,Long> {
    List<UserPackage> getUserPackageByUserId(String user_id);
    void deleteByUserIdAndSriPackageId(String user_id, Long packageId);
}
