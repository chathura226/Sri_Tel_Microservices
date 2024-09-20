package com.chathuralakshan.recruitease.packageservice.service;

import com.chathuralakshan.recruitease.packageservice.dto.PackageDTO;
import com.chathuralakshan.recruitease.packageservice.model.SriPackage;
import com.chathuralakshan.recruitease.packageservice.model.PackageType;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface PackageService {

    void AddPackage(@RequestBody PackageDTO packageDTO);
    List<SriPackage> getAllPackages();
    List<SriPackage> getAllPackagesByType(PackageType type);

    void activatePackage(String userId,long packageId);

    SriPackage getPackageById(Long id);
}
