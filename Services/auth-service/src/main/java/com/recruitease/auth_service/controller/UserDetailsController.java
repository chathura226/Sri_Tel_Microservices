package com.recruitease.auth_service.controller;

import com.recruitease.auth_service.DTO.*;
import com.recruitease.auth_service.service.UserService;
import com.recruitease.auth_service.util.CodeList;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserDetailsController {

    private final UserService userService;







    @GetMapping("/customer/{customerId}")
    public ResponseEntity<ResponseDTO> customerDetails(@PathVariable  String customerId) {
        ResponseDTO res= userService.getCustomerDetails(customerId);
        if(res.getCode().equals(CodeList.RSP_SUCCESS)){

            return new ResponseEntity<>(res,HttpStatus.CREATED);

        }else{//some error

            return new ResponseEntity<>(res,HttpStatus.BAD_REQUEST);
        }

    }


    @GetMapping("/admin/{adminId}")
    public ResponseEntity<ResponseDTO> adminDetails(@PathVariable  String adminId) {
        ResponseDTO res= userService.getAdminDetails(adminId);
        if(res.getCode().equals(CodeList.RSP_SUCCESS)){

            return new ResponseEntity<>(res,HttpStatus.CREATED);

        }else{//some error

            return new ResponseEntity<>(res,HttpStatus.BAD_REQUEST);
        }

    }

}
