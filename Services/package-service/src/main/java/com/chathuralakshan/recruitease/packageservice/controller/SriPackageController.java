package com.chathuralakshan.recruitease.packageservice.controller;


import com.chathuralakshan.recruitease.packageservice.dto.ActivationRequestDTO;
import com.chathuralakshan.recruitease.packageservice.dto.PackageDTO;
import com.chathuralakshan.recruitease.packageservice.model.PackageType;
import com.chathuralakshan.recruitease.packageservice.model.SriPackage;
import com.chathuralakshan.recruitease.packageservice.service.PackageService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@AllArgsConstructor
@RequestMapping("/api/package")
public class SriPackageController {
    private final PackageService packageService;
    @PostMapping("/add")
    public void addPackage(@RequestBody PackageDTO packageDTO){
        packageService.AddPackage(packageDTO);
    }

    @PostMapping("/activate/{user_id}")
    public void activatePachage(@PathVariable String user_id,
            @RequestBody ActivationRequestDTO package_id){
        packageService.activatePackage(user_id,package_id.getPackageId());

    }

    @PostMapping("/deactivate/{user_id}")
    public void deactivatePachage(@PathVariable String user_id,
                                @RequestBody ActivationRequestDTO package_id){
        packageService.deactivatePackage(user_id,package_id.getPackageId());

    }

    @GetMapping("/all")
    public List<SriPackage> getAllPackages(){
        return packageService.getAllPackages();
    }

    @GetMapping("/all/{type}")
    public List<SriPackage> getAllPackagesByType(@PathVariable("type")
            PackageType packageType){
        return packageService.getAllPackagesByType(packageType);
    }
    @GetMapping("/{id}")
    public ResponseEntity<SriPackage> getPackageById(@PathVariable("id") Long id)
    {
        SriPackage sriPackage = packageService.getPackageById(id);

        return ResponseEntity.ok(sriPackage);
    }

    @GetMapping("/active/{user_id}")
    public ResponseEntity<List<SriPackage>> getActivePackages(@PathVariable String user_id)
    {
        List<SriPackage> sriPackage = packageService.getActivePackagesByID(user_id);

        return ResponseEntity.ok(sriPackage);
    }
}
