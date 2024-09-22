package com.chathuralakshan.recruitease.packageservice.repository;

import com.chathuralakshan.recruitease.packageservice.model.SriPackage;
import com.chathuralakshan.recruitease.packageservice.model.PackageType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PackageRepository extends JpaRepository<SriPackage,Long> {
    List<SriPackage> getSriPackageByPackageType(PackageType packageType);
    List<SriPackage> getSriPackageByIdIn(List<Long> ids);
}
