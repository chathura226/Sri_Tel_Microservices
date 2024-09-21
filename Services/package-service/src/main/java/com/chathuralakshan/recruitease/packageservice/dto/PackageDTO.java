package com.chathuralakshan.recruitease.packageservice.dto;


import com.chathuralakshan.recruitease.packageservice.model.PackageType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PackageDTO {

    private String name;
    private Double price;
    private PackageType PackageType;
}
