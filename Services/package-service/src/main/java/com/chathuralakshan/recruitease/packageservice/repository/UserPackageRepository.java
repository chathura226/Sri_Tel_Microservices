package com.chathuralakshan.recruitease.packageservice.repository;

import com.chathuralakshan.recruitease.packageservice.model.SriPackage;
import com.chathuralakshan.recruitease.packageservice.model.UserPackage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserPackageRepository extends JpaRepository<UserPackage,Long> {
}
