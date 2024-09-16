package com.recruitease.auth_service.DTO.roleDetails;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDate;
@EqualsAndHashCode(callSuper = true)
@Data()
public class CustomerRoleDetail extends RoleDetailObject {
    //attributes other than common attributes
    private String customerId;
}

